import { cast } from './'

const dfs = (tree, nodeCallback) => {
    nodeCallback = nodeCallback || function (e) {
        return e
    }

    const vertex = {}

    function _local_dfs(tree) {
        const branchset = tree.branchset || []

        if (branchset.length !== 0) {
            for (let i = 0; i < branchset.length; i++) {
                vertex[branchset[i].name] = branchset[i].length
                tree.branchset[i] = nodeCallback(tree.branchset[i])
                _local_dfs(branchset[i])
            }
        }
    }

    tree = cast(tree)
    _local_dfs(tree)

    return vertex
}

export default dfs
