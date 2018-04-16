import { parse } from './'

/**
 * Casts tree or string to tree-object
 * @private
 * @param {string|object} s Newick-string or tree-object
 * @returns {object} Tree-object
 */
const cast = (s) => {
    if (typeof s === 'string') {
        try {
            s = JSON.parse(s)
        } catch (e) {
            s = parse(s)
        }
    }

    return s
}

export default cast
