import { NewickNode } from '../types';
import { cast } from '../tools/cast';
import { getRoot } from '../tools/getRoot';
import { dfs } from '../tools/dfs';
import { map } from '../tools/map';
import { normalize } from '../tools/normalize';
import { serialize } from '../tools/serialize';
import { parse } from '../tools/parse';

export class Newick {
  private tree: NewickNode;

  constructor(data: string | NewickNode) {
    this.tree = cast(data);
  }

  getRoot(): string | null {
    return getRoot(this.tree);
  }

  dfs(callback?: (node: NewickNode) => NewickNode): Record<string, number> {
    return dfs(this.tree, callback);
  }

  map(callback?: (node: NewickNode) => NewickNode): void {
    this.tree = map(this.tree, callback);
  }

  normalize(): NewickNode {
    return normalize(this.tree);
  }

  serialize(): string {
    return serialize(this.tree);
  }

  toString(): string {
    return serialize(this.tree);
  }

  clone(): Newick {
    // Deep clone by serializing and reparsing
    return new Newick(this.serialize());
  }

  equal(anotherTree: Newick): boolean {
    return (
      this.serialize().toLowerCase() === anotherTree.serialize().toLowerCase()
    );
  }

  parse(string: string): NewickNode {
    return parse(string);
  }
}
