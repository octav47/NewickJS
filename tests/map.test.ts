import { map } from '../src';
import { NewickNode } from '../src/types';

describe('map', () => {
  test('returns identical tree if no callback provided', () => {
    const tree: NewickNode = {
      name: 'Root',
      branchset: [{ name: 'A', length: 1 }],
    };

    const result = map(tree);
    expect(result).toEqual(tree);
  });

  test('modifies each node by appending "_mod" to name', () => {
    const tree: NewickNode = {
      name: 'Root',
      branchset: [
        { name: 'A', length: 1 },
        { name: 'B', length: 2 },
      ],
    };

    const callback = (node: NewickNode): NewickNode => {
      return { ...node, name: node.name ? `${node.name}_mod` : node.name };
    };

    const result = map(tree, callback);

    expect(result.branchset![0].name).toBe('A_mod');
    expect(result.branchset![1].name).toBe('B_mod');
  });

  test('works with Newick string input', () => {
    const input = '(A:1,B:2)Root;';
    const callback = (node: NewickNode): NewickNode => ({
      ...node,
      length: node.length ? node.length * 2 : node.length,
    });

    const result = map(input, callback);

    expect(result.branchset![0].length).toBeCloseTo(2);
    expect(result.branchset![1].length).toBeCloseTo(4);
  });
});
