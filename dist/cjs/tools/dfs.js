"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dfs = dfs;
const cast_1 = require("./cast");
/**
 * Performs depth-first traversal of a Newick tree.
 * Returns a flat object mapping node names to branch lengths.
 *
 * @param tree - Newick tree or string
 * @param nodeCallback - Optional callback applied to each node
 * @returns Object mapping node names to branch lengths
 */
function dfs(tree, nodeCallback = (e) => e) {
    const vertex = {};
    function _local_dfs(node) {
        const branchset = node.branchset || [];
        for (let i = 0; i < branchset.length; i++) {
            const child = branchset[i];
            if (child.name && typeof child.length === 'number') {
                vertex[child.name] = child.length;
            }
            // Apply the callback and recurse
            if (node.branchset && node.branchset[i]) {
                node.branchset[i] = nodeCallback(child);
            }
            _local_dfs(child);
        }
    }
    const parsedTree = (0, cast_1.cast)(tree);
    _local_dfs(parsedTree);
    return vertex;
}
