import * as Tools from './tools'

class Newick {
    constructor (data) {
        this.tree = Tools.cast(data)
    }

    getRoot = () => Tools.getRoot(this.tree)

    dfs = callback => Tools.dfs(this.tree, callback)

    map = callback => {
        this.tree = Tools.map(this.tree, callback)
    }

    normalize = () => Tools.normalize(this.tree)

    serialize = () => Tools.serialize(this.tree)

    toString = () => this.serialize()

    clone = () => new Newick(this.tree)

    equal = anotherTree => this.serialize()
        .toLowerCase() === anotherTree.serialize()
            .toLowerCase()

    parse = string => Tools.parse(string)
}

export default Newick
