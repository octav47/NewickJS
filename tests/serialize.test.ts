import { serialize } from '../src';
import { NewickNode } from '../src/types';

describe('serialize', () => {
  test('serializes a simple node with name and length', () => {
    const node: NewickNode = { name: 'A', length: 0.5 };
    expect(serialize(node)).toBe('A:0.5');
  });

  test('serializes nested nodes with branchset', () => {
    const tree: NewickNode = {
      branchset: [
        { name: 'A', length: 0.1 },
        { name: 'B', length: 0.2 },
      ],
      name: 'Root',
    };

    expect(serialize(tree)).toBe('(A:0.1,B:0.2)Root');
  });

  test('serializes nodes without length', () => {
    const node: NewickNode = { name: 'Solo' };
    expect(serialize(node)).toBe('Solo');
  });

  test('serializes nodes without name', () => {
    const node: NewickNode = {
      branchset: [{ name: 'A', length: 1 }],
      length: 0.5,
    };
    expect(serialize(node)).toBe('(A:1):0.5');
  });

  test('serializes empty node', () => {
    const node: NewickNode = {};
    expect(serialize(node)).toBe('');
  });
});
