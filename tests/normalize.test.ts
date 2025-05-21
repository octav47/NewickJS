import { normalize } from '../src';
import { NewickNode } from '../src/types';

describe('normalize', () => {
  test('normalizes lengths so sum equals 1', () => {
    const tree: NewickNode = {
      name: 'Root',
      branchset: [
        { name: 'A', length: 2 },
        { name: 'B', length: 3 },
      ],
    };

    const normalized = normalize(tree);

    const lengths = normalized.branchset?.map((node) => node.length ?? 0) ?? [];
    const sum = lengths.reduce((a, b) => a + b, 0);

    expect(sum).toBeCloseTo(1);
    expect(lengths).toEqual([2 / 5, 3 / 5]);
  });

  test('works correctly with Newick string input', () => {
    const newick = '(A:2,B:3)Root;';
    const normalized = normalize(newick);

    const lengths = normalized.branchset?.map((node) => node.length ?? 0) ?? [];
    const sum = lengths.reduce((a, b) => a + b, 0);

    expect(sum).toBeCloseTo(1);
    expect(lengths).toEqual([2 / 5, 3 / 5]);
  });

  test('returns original tree if total length is zero', () => {
    const tree: NewickNode = {
      name: 'Root',
      branchset: [
        { name: 'A', length: 0 },
        { name: 'B', length: 0 },
      ],
    };

    const normalized = normalize(tree);

    expect(normalized).toEqual(tree);
  });

  test('handles tree without length fields gracefully', () => {
    const tree: NewickNode = {
      name: 'Root',
      branchset: [{ name: 'A' }, { name: 'B' }],
    };

    const normalized = normalize(tree);

    // No lengths, so nothing to normalize; returned tree equals input
    expect(normalized).toEqual(tree);
  });
});
