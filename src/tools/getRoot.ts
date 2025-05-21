import { cast } from './cast';
import { NewickNode } from '../types';

/**
 * Returns the name of the root node of a Newick tree
 * @param tree - Newick string or tree object
 * @returns Root node name or null
 */
export function getRoot(tree: string | NewickNode): string | null {
  const obj = cast(tree);

  if (typeof obj.name === 'string') {
    if (obj.name === '') {
      return null;
    }

    return obj.name;
  }

  return null;
}
