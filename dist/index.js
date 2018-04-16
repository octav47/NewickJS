(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["NewickJS"] = factory();
	else
		root["NewickJS"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parse__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return __WEBPACK_IMPORTED_MODULE_0__parse__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cast__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "cast", function() { return __WEBPACK_IMPORTED_MODULE_1__cast__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getRoot__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "getRoot", function() { return __WEBPACK_IMPORTED_MODULE_2__getRoot__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__serialize__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "serialize", function() { return __WEBPACK_IMPORTED_MODULE_3__serialize__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dfs__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "dfs", function() { return __WEBPACK_IMPORTED_MODULE_4__dfs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__map__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return __WEBPACK_IMPORTED_MODULE_5__map__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__normalize__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "normalize", function() { return __WEBPACK_IMPORTED_MODULE_6__normalize__["a"]; });















/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Newick__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tools__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Newick", function() { return __WEBPACK_IMPORTED_MODULE_0__Newick__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "NewickTools", function() { return __WEBPACK_IMPORTED_MODULE_1__tools__; });





/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tools__ = __webpack_require__(0);


class Newick {
    constructor(data) {
        this.getRoot = () => __WEBPACK_IMPORTED_MODULE_0__tools__["getRoot"](this.tree);

        this.dfs = callback => __WEBPACK_IMPORTED_MODULE_0__tools__["dfs"](this.tree, callback);

        this.map = callback => {
            this.tree = __WEBPACK_IMPORTED_MODULE_0__tools__["map"](this.tree, callback);
        };

        this.normalize = () => __WEBPACK_IMPORTED_MODULE_0__tools__["normalize"](this.tree);

        this.serialize = () => __WEBPACK_IMPORTED_MODULE_0__tools__["serialize"](this.tree);

        this.toString = () => this.serialize();

        this.clone = () => new Newick(this.tree);

        this.equal = anotherTree => this.serialize().toLowerCase() === anotherTree.serialize().toLowerCase();

        this.parse = string => __WEBPACK_IMPORTED_MODULE_0__tools__["parse"](string);

        this.tree = __WEBPACK_IMPORTED_MODULE_0__tools__["cast"](data);
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Newick);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const parse = s => {
    let ancestors = [];
    let tree = {};
    let tokens = s.split(/\s*([;(),:])\s*/);
    let subtree;
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        switch (token) {
            case '(':
                // new branchset
                subtree = {};
                tree.branchset = [subtree];
                ancestors.push(tree);
                tree = subtree;
                break;
            case ',':
                // another branch
                subtree = {};
                ancestors[ancestors.length - 1].branchset.push(subtree);
                tree = subtree;
                break;
            case ')':
                // optional name next
                tree = ancestors.pop();
                break;
            case ':':
                // optional length next
                break;
            default:
                let x = tokens[i - 1];
                if (x === ')' || x === '(' || x === ',') {
                    tree.name = token;
                } else if (x === ':') {
                    tree.length = parseFloat(token);
                }
        }
    }
    return tree;
};

/* harmony default export */ __webpack_exports__["a"] = (parse);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);


/**
 * Casts tree or string to tree-object
 * @private
 * @param {string|object} s Newick-string or tree-object
 * @returns {object} Tree-object
 */
const cast = s => {
    if (typeof s === 'string') {
        try {
            s = JSON.parse(s);
        } catch (e) {
            s = __WEBPACK_IMPORTED_MODULE_0____["parse"](s);
        }
    }

    return s;
};

/* harmony default export */ __webpack_exports__["a"] = (cast);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);


/**
 * Returns a root of the tree
 * @private
 * @param {string|object} tree Newick-string or tree-object
 * @returns {string}
 */
const getRoot = tree => {
    tree = __WEBPACK_IMPORTED_MODULE_0____["cast"](tree);
    for (let i in tree) {
        if (tree.hasOwnProperty(i) && i === 'name') {
            return tree[i];
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (getRoot);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const serialize = node => {
    let newick = '';

    if (node.branchset && node.branchset.length) {
        newick += `(${node.branchset.map(serialize).join(',')})`;
    }

    if (node.name) {
        newick += node.name;
    }

    if (node.length) {
        newick += `:${node.length}`;
    }

    return newick;
};

/* harmony default export */ __webpack_exports__["a"] = (node => `${serialize(node)};`);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);


const dfs = (tree, nodeCallback) => {
    nodeCallback = nodeCallback || function (e) {
        return e;
    };

    let vertex = {};

    function _local_dfs(tree) {
        let branchset = tree.branchset || [];
        if (branchset.length !== 0) {
            for (let i = 0; i < branchset.length; i++) {
                vertex[branchset[i].name] = branchset[i].length;
                tree.branchset[i] = nodeCallback(tree.branchset[i]);
                _local_dfs(branchset[i]);
            }
        }
    }

    tree = __WEBPACK_IMPORTED_MODULE_0____["cast"](tree);
    _local_dfs(tree);
    return vertex;
};

/* harmony default export */ __webpack_exports__["a"] = (dfs);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);


const map = (tree, callback) => {
    callback = callback || function (e) {
        return e;
    };
    tree = __WEBPACK_IMPORTED_MODULE_0____["cast"](tree);
    __WEBPACK_IMPORTED_MODULE_0____["dfs"](tree, null, callback);
    return tree;
};

/* harmony default export */ __webpack_exports__["a"] = (map);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0____ = __webpack_require__(0);


const normalize = s => {
    s = __WEBPACK_IMPORTED_MODULE_0____["cast"](s);
    function _local_normalize(tree) {
        let vertex = __WEBPACK_IMPORTED_MODULE_0____["dfs"](tree);
        let total = 0;
        for (let i in vertex) {
            if (vertex.hasOwnProperty(i)) {
                total += vertex[i];
            }
        }
        __WEBPACK_IMPORTED_MODULE_0____["dfs"](tree, null, function (e) {
            e.length = e.length / total;
            return e;
        });
        return tree;
    }

    return _local_normalize(s);
};

/* harmony default export */ __webpack_exports__["a"] = (normalize);

/***/ })
/******/ ]);
});