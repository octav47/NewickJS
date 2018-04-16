const serialize = node => {
    let newick = ''

    if (node.branchset && node.branchset.length) {
        newick += `(${node.branchset.map(serialize).join(',')})`
    }

    if (node.name) {
        newick += node.name
    }

    if (node.length) {
        newick += `:${node.length}`
    }

    return newick
}

export default node => `${serialize(node)};`
