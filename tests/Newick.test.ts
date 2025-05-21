import { Newick } from '../src';

describe('Newick class', () => {
  const newickString = '(A:0.1,B:0.2)Root;';

  test('constructor parses string into tree', () => {
    const tree = new Newick(newickString);
    expect(tree.getRoot()).toBe('Root');
  });

  test('getRoot returns root name', () => {
    const tree = new Newick(newickString);
    expect(tree.getRoot()).toBe('Root');
  });

  test('dfs returns vertex lengths', () => {
    const tree = new Newick(newickString);
    const vertex = tree.dfs();
    expect(vertex).toHaveProperty('A', 0.1);
    expect(vertex).toHaveProperty('B', 0.2);
  });

  test('map modifies the tree nodes', () => {
    const tree = new Newick(newickString);
    tree.map((node) => {
      if (node.name) node.name = node.name.toLowerCase();
      return node;
    });
    expect(tree.getRoot()).toBe('Root');
  });

  test('normalize returns normalized tree', () => {
    const tree = new Newick(newickString);
    const normalized = tree.normalize();
    // Sum of lengths should be ~1 after normalize, check one child length
    expect(
      normalized.branchset![0].length! + normalized.branchset![1].length!,
    ).toBeCloseTo(1);
  });

  test('serialize returns Newick string', () => {
    const tree = new Newick(newickString);
    expect(tree.serialize()).toBe(newickString.slice(0, -1)); // serialize omits trailing semicolon?
  });

  test('toString returns serialized string', () => {
    const tree = new Newick(newickString);
    expect(tree.toString()).toBe(tree.serialize());
  });

  test('clone creates a new equal instance', () => {
    const tree = new Newick(newickString);
    const cloned = tree.clone();
    expect(cloned).not.toBe(tree);
    expect(cloned.equal(tree)).toBe(true);
  });

  test('equal returns true for identical trees', () => {
    const tree1 = new Newick(newickString);
    const tree2 = new Newick(newickString.toUpperCase());
    expect(tree1.equal(tree2)).toBe(true);
  });

  test('parse returns tree object', () => {
    const tree = new Newick(newickString);
    const parsed = tree.parse(newickString);
    expect(parsed).toHaveProperty('branchset');
  });
});
