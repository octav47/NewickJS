import { NewickNode } from '../types';

/**
 * Recursively serialize a NewickNode tree into a Newick-format string (without trailing semicolon)
 * @param node - Newick tree node
 * @returns Newick string for the node subtree
 */
export function serialize(node: NewickNode): string {
  let newick = '';

  if (node.branchset && node.branchset.length > 0) {
    newick += `(${node.branchset.map(serialize).join(',')})`;
  }

  if (node.name) {
    newick += node.name;
  }

  if (typeof node.length === 'number') {
    newick += `:${node.length}`;
  }

  return newick;
}
