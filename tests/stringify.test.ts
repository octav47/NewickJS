import { stringify } from '../src';
import { NewickNode } from '../src/types';

describe('stringify', () => {
  test('adds trailing semicolon to serialized string', () => {
    const node: NewickNode = { name: 'A', length: 0.5 };
    expect(stringify(node)).toBe('A:0.5;');
  });

  test('stringify on nested nodes includes semicolon', () => {
    const tree: NewickNode = {
      branchset: [
        { name: 'A', length: 0.1 },
        { name: 'B', length: 0.2 },
      ],
      name: 'Root',
    };

    expect(stringify(tree)).toBe('(A:0.1,B:0.2)Root;');
  });

  test('stringify empty node returns only semicolon', () => {
    const node: NewickNode = {};
    expect(stringify(node)).toBe(';');
  });

  test('stringify node without length or name', () => {
    const node: NewickNode = { branchset: [{ name: 'A' }] };
    expect(stringify(node)).toBe('(A);');
  });
});
