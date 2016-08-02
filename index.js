'use strict';

/**
 * Newick format parser in JavaScript.
 *
 * Copyright (c) Jason Davies 2010, Thomas Sibley 2014, Kir Tribunsky 2015.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Example tree (from http://en.wikipedia.org/wiki/Newick_format):
 *
 * +--0.1--A
 * F-----0.2-----B            +-------0.3----C
 * +------------------0.5-----E
 *                            +---------0.4------D
 *
 * Newick format:
 * (A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;
 *
 * Converted to JSON:
 * {
 *   name: "F",
 *   branchset: [
 *     {name: "A", length: 0.1},
 *     {name: "B", length: 0.2},
 *     {
 *       name: "E",
 *       length: 0.5,
 *       branchset: [
 *         {name: "C", length: 0.3},
 *         {name: "D", length: 0.4}
 *       ]
 *     }
 *   ]
 * }
 *
 * Converted to JSON, but with no names or lengths:
 * {
 *   branchset: [
 *     {}, {}, {
 *       branchset: [{}, {}]
 *     }
 *   ]
 * }
 */

(function (exports) {
    /**
     * Parse Newick string into tree-object
     * @param {string} s Newick string
     * @return {object}
     *
     * @example
     * var treeString = '(A:0.1,B:0.2,(C:0.3,D:0.4)E:0.5)F;';
     * var tree = Newick.parse(treeString);
     */
    exports.parse = function (s) {
        var ancestors = [];
        var tree = {};
        var tokens = s.split(/\s*(;|\(|\)|,|:)\s*/);
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            switch (token) {
                case '(': // new branchset
                    var subtree = {};
                    tree.branchset = [subtree];
                    ancestors.push(tree);
                    tree = subtree;
                    break;
                case ',': // another branch
                    var subtree = {};
                    ancestors[ancestors.length - 1].branchset.push(subtree);
                    tree = subtree;
                    break;
                case ')': // optional name next
                    tree = ancestors.pop();
                    break;
                case ':': // optional length next
                    break;
                default:
                    var x = tokens[i - 1];
                    if (x == ')' || x == '(' || x == ',') {
                        tree.name = token;
                    } else if (x == ':') {
                        tree.length = parseFloat(token);
                    }
            }
        }
        return tree;
    };

    /**
     * Casts tree or string to tree-object
     * @private
     * @param {string|object} s Newick-string or tree-object
     * @returns {object}
     */
    function cast(s) {
        if (typeof s == 'string') {
            try {
                s = JSON.parse(s);
            } catch (e) {
                s = Newick.parse(s);
            }
        }
        return s;
    }

    /**
     * Returns a root of the tree
     * @param {string|object} tree Newick-string or tree-object
     * @returns {string}
     */
    exports.getRoot = function (tree) {
        return getRoot(tree);
    };

    /**
     * Returns a root of the tree
     * @private
     * @param {string|object} tree Newick-string or tree-object
     * @returns {string}
     */
    function getRoot(tree) {
        tree = cast(tree);
        for (var i in tree) {
            if (tree.hasOwnProperty(i) && i == 'name') {
                return tree[i];
            }
        }
    }

    /**
     * Depth-first search
     * @param {string|object} tree Newick-string or tree-object
     * @param [nodeCallback]
     * @returns {object}
     */
    exports.dfs = function (tree, nodeCallback) {
        nodeCallback = nodeCallback || function (e) {
                return e;
            };

        var vertex = {};

        function _dfs(tree) {
            var branchset = tree.branchset || [];
            if (branchset.length !== 0) {
                for (var i = 0; i < branchset.length; i++) {
                    vertex[branchset[i].name] = branchset[i].length;
                    tree.branchset[i] = nodeCallback(tree.branchset[i]);
                    _dfs(branchset[i]);
                }
            }
        }

        tree = cast(tree);
        _dfs(tree);
        return vertex;
    };

    /**
     * Maps each node with operation
     * @param {string|object} tree Newick-string or tree-object
     * @param {Function} callback Callback will be applied for each node
     * @returns {object}
     */
    exports.map = function (tree, callback) {
        callback = callback || function (e) {
                return e;
            };
        tree = cast(tree);
        exports.dfs(tree, null, callback);
        return tree;
    };

    exports.drown = function (s) {
        s = cast(s);
        function _drown(tree) {
            var branchset = tree.branchset || [];
            if (tree.hasOwnProperty('length')) {
                var s = 0;
                for (var i = 0; i < branchset.length; i++) {
                    s += branchset[i].length;
                }
                var x = tree.length / s;
                for (var i = 0; i < branchset.length; i++) {
                    branchset[i].length += branchset[i].length * x;
                }
                if (branchset.length != 0) {
                    tree.length = 0;
                }
                console.log(tree);
            }
            for (var i = 0; i < branchset.length; i++) {
                _drown(branchset[i]);
            }
        }

        _drown(s);
        return s;
    };

    /**
     * Returns normalized tree in [0; 1]
     * @param {string|object} s Newick-string or tree-object
     * @returns {object}
     */
    exports.normalize = function (s) {
        s = cast(s);
        function _normalize(tree) {
            var vertex = exports.dfs(tree);
            var total = 0;
            for (var i in vertex) {
                if (vertex.hasOwnProperty(i)) {
                    total += vertex[i];
                }
            }
            exports.dfs(tree, null, function (e) {
                e.length = (e.length) / total;
                return e;
            });
            return tree;
        }

        return _normalize(s);
    };

    /**
     * Serializes tree
     * @param {object} tree Newick-string or tree-object
     * @returns {string}
     */
    exports.serialize = function (tree) {
        tree = cast(tree);
        return serialize(tree) + ";";
    };

    function serialize(node) {
        var newick = "";
        if (node.branchset && node.branchset.length)
            newick += "(" + node.branchset.map(serialize).join(",") + ")";
        if (node.name != null)
            newick += node.name;
        if (node.length != null)
            newick += ":" + node.length;
        return newick;
    }

})(typeof exports !== "undefined" ? exports : this.Newick = {});