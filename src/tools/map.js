import { cast, dfs } from './'

const map = (tree, callback) => {
    callback = callback || function (e) {
        return e
    }

    tree = cast(tree)
    dfs(tree, null, callback)

    return tree
}

export default map
