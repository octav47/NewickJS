import { parse } from '../src';
import { NewickNode } from '../src/types';

describe('parse', () => {
  test('парсит одиночный узел', () => {
    const input = 'A;';
    const tree = parse(input);

    expect(tree).toEqual<NewickNode>({});
  });

  test('парсит дерево с одной вложенной веткой', () => {
    const input = '(A:0.1)B;';
    const tree = parse(input);

    expect(tree).toEqual<NewickNode>({
      name: 'B',
      branchset: [
        {
          name: 'A',
          length: 0.1,
        },
      ],
    });
  });

  test('парсит несколько ветвей', () => {
    const input = '(A:0.1,B:0.2)Root;';
    const tree = parse(input);

    expect(tree).toEqual<NewickNode>({
      name: 'Root',
      branchset: [
        { name: 'A', length: 0.1 },
        { name: 'B', length: 0.2 },
      ],
    });
  });

  test('парсит глубоко вложенное дерево', () => {
    const input = '((A:0.1,B:0.2)X:0.5,C:0.3)Root;';
    const tree = parse(input);

    expect(tree).toEqual<NewickNode>({
      name: 'Root',
      branchset: [
        {
          name: 'X',
          length: 0.5,
          branchset: [
            { name: 'A', length: 0.1 },
            { name: 'B', length: 0.2 },
          ],
        },
        { name: 'C', length: 0.3 },
      ],
    });
  });
});
