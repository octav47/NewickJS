import { cast } from './'

/**
 * Returns a root of the tree
 * @private
 * @param {string|object} tree Newick-string or tree-object
 * @returns {string|null} root node
 */
const getRoot = tree => {
    tree = cast(tree)

    for (const i in tree) {
        if (tree.hasOwnProperty(i) && i === 'name') {
            return tree[i]
        }
    }

    return null
}

export default getRoot
