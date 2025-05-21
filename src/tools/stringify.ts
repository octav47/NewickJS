import { serialize } from './serialize';
import { NewickNode } from '../types';

/**
 * Converts a NewickNode tree to a full Newick string with trailing semicolon
 * @param node - Newick tree node
 * @returns Newick format string
 */
export function stringify(node: NewickNode): string {
  return `${serialize(node)};`;
}
