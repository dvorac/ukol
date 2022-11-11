import { Priority } from '@ukol/graphql';
import { byPriority } from './sort'

describe('byPriority', () => {
  it('should sort an empty array', () => {
    const test: Array<Priority> = [];
    test.sort(byPriority());
    expect(test).toEqual([]);
  });

  it('should sort in normal order', () => {
    const test = Array<Priority>(4)
      .fill({ uuid: '1', priority: 1, description: 'desc' })
      .map((p, idx, arr) => ({ ...p, priority: arr.length - 1 - idx, uuid: idx.toString()}));

    const expected = test.slice().reverse();

    test.sort(byPriority());
    expect(test).toEqual(expected);
  });

  it('should sort in empty priority last', () => {
    const test = Array<Priority>(4)
      .fill({ uuid: '1', priority: undefined, description: 'desc' }, 1)
      .map((p, idx, arr) => ({ ...p, priority: arr.length - 1 - idx, uuid: idx.toString()}));

    const expected = test.slice().reverse();

    test.sort(byPriority());
    expect(test).toEqual(expected);
  });
});
