import { dfs } from '../src';
import { NewickNode } from '../src/types';

describe('dfs', () => {
  test('traverses a flat tree and returns name-to-length map', () => {
    const tree: NewickNode = {
      name: 'Root',
      branchset: [
        { name: 'A', length: 0.5 },
        { name: 'B', length: 1.0 },
      ],
    };

    const result = dfs(tree);
    expect(result).toEqual({
      A: 0.5,
      B: 1.0,
    });
  });

  test('traverses a deeply nested tree', () => {
    const tree: NewickNode = {
      name: 'Root',
      branchset: [
        {
          name: 'X',
          length: 0.3,
          branchset: [
            { name: 'A', length: 0.1 },
            { name: 'B', length: 0.2 },
          ],
        },
        { name: 'C', length: 0.9 },
      ],
    };

    const result = dfs(tree);
    expect(result).toEqual({
      X: 0.3,
      A: 0.1,
      B: 0.2,
      C: 0.9,
    });
  });

  test('accepts Newick string as input and parses it correctly', () => {
    const input = '(A:0.1,B:0.2)Root;';
    const result = dfs(input);

    expect(result).toEqual({
      A: 0.1,
      B: 0.2,
    });
  });

  test('returns empty object when there are no branches', () => {
    const tree: NewickNode = {
      name: 'Solo',
    };

    const result = dfs(tree);
    expect(result).toEqual({});
  });

  test('applies nodeCallback to each child node', () => {
    const tree: NewickNode = {
      name: 'Root',
      branchset: [{ name: 'A', length: 0.5 }],
    };

    const callback = jest.fn((node: NewickNode) => ({
      ...node,
      length: node.length! * 2,
    }));

    const result = dfs(tree, callback);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ name: 'A', length: 0.5 });

    // The returned value is still based on original data
    expect(result).toEqual({
      A: 0.5,
    });
  });
});
