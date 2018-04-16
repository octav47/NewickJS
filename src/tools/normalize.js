import { cast, dfs } from './'

const normalize = s => {
    s = cast(s)

    function _local_normalize(tree) {
        const vertex = dfs(tree)
        let total = 0

        for (const i in vertex) {
            if (vertex.hasOwnProperty(i)) {
                total += vertex[i]
            }
        }
        dfs(tree, null, (e) => {
            e.length = (e.length) / total

            return e
        })

        return tree
    }

    return _local_normalize(s)
}

export default normalize
