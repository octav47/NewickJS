import { getRoot } from '../src';
import { NewickNode } from '../src/types';

describe('getRoot', () => {
  test('returns root name from a tree object', () => {
    const tree: NewickNode = {
      name: 'Root',
      branchset: [{ name: 'A', length: 1 }],
    };

    expect(getRoot(tree)).toBe('Root');
  });

  test('returns root name from a Newick string', () => {
    const input = '(A:0.1,B:0.2)Root;';
    expect(getRoot(input)).toBe('Root');
  });

  test('returns null if name is missing', () => {
    const tree: NewickNode = {
      branchset: [{ name: 'A', length: 1 }],
    };

    expect(getRoot(tree)).toBeNull();
  });

  test('returns null if input is an empty object', () => {
    expect(getRoot({} as NewickNode)).toBeNull();
  });

  test('returns null if input is a malformed Newick string', () => {
    const input = '();';
    expect(getRoot(input)).toBeNull();
  });
});
