import { cast } from '../src';
import { NewickNode } from '../src/types';

describe('cast', () => {
  test('возвращает объект без изменений, если передан уже дерево', () => {
    const input: NewickNode = {
      name: 'A',
      length: 1.5,
      branchset: [{ name: 'B', length: 2.0 }],
    };

    const result = cast(input);
    expect(result).toBe(input); // ссылка должна сохраниться
  });

  test('парсит JSON-строку', () => {
    const jsonStr = JSON.stringify({
      name: 'Root',
      branchset: [{ name: 'Leaf', length: 0.1 }],
    });

    const result = cast(jsonStr);

    expect(result).toEqual<NewickNode>({
      name: 'Root',
      branchset: [{ name: 'Leaf', length: 0.1 }],
    });
  });

  test('парсит Newick-строку', () => {
    const newickStr = '(A:0.1)B;';
    const result = cast(newickStr);

    expect(result).toEqual<NewickNode>({
      name: 'B',
      branchset: [
        {
          name: 'A',
          length: 0.1,
        },
      ],
    });
  });

  test('предпочитает JSON.parse перед parse()', () => {
    const jsonStr = '{"name":"X","branchset":[{"name":"Y","length":1.2}]}';
    const result = cast(jsonStr);

    expect(result.name).toBe('X');
    expect(result.branchset?.[0].name).toBe('Y');
    expect(result.branchset?.[0].length).toBe(1.2);
  });

  test('не выбрасывает ошибку на некорректный JSON, а парсит как Newick', () => {
    const newickStr = '(A:0.1,B:0.2)Root;';
    const result = cast(newickStr);

    expect(result).toEqual<NewickNode>({
      name: 'Root',
      branchset: [
        { name: 'A', length: 0.1 },
        { name: 'B', length: 0.2 },
      ],
    });
  });
});
