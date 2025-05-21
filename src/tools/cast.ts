import { parse } from './parse';
import { NewickNode } from '../types';

/**
 * Casts a Newick string or an object (stringified or not) to a tree object.
 * Accepts: Newick string, stringified JSON, or a NewickNode object.
 */
export function cast(input: string | NewickNode): NewickNode {
  if (typeof input === 'string') {
    try {
      return JSON.parse(input) as NewickNode;
    } catch {
      return parse(input);
    }
  }

  return input;
}
