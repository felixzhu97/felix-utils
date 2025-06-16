import {
  unique,
  uniqueBy,
  chunk,
  flatten,
  flattenDeep,
  intersection,
  difference,
  union,
  shuffle,
  sample,
  groupBy,
  sum,
  sumBy,
} from '../utils/array';

describe('Array utilities', () => {
  describe('unique', () => {
    it('should remove duplicate primitives', () => {
      expect(unique([1, 2, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(unique(['a', 'b', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty array', () => {
      expect(unique([])).toEqual([]);
    });

    it('should handle array with no duplicates', () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('uniqueBy', () => {
    it('should remove duplicates by property', () => {
      const users = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 1, name: 'John Doe' },
        { id: 3, name: 'Bob' },
      ];
      const result = uniqueBy(users, 'id');
      expect(result).toEqual([
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Bob' },
      ]);
    });

    it('should handle empty array', () => {
      expect(uniqueBy([], 'id')).toEqual([]);
    });
  });

  describe('chunk', () => {
    it('should split array into chunks', () => {
      expect(chunk([1, 2, 3, 4, 5, 6], 2)).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ]);
      expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should handle empty array', () => {
      expect(chunk([], 2)).toEqual([]);
    });

    it('should handle size <= 0', () => {
      expect(chunk([1, 2, 3], 0)).toEqual([]);
      expect(chunk([1, 2, 3], -1)).toEqual([]);
    });

    it('should handle size larger than array', () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });
  });

  describe('flatten', () => {
    it('should flatten array with default depth', () => {
      expect(flatten([1, [2, 3], [4, [5]]])).toEqual([1, 2, 3, 4, [5]]);
    });

    it('should flatten array with custom depth', () => {
      expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
    });

    it('should handle depth 0', () => {
      const arr = [1, [2, 3]];
      expect(flatten(arr, 0)).toEqual(arr);
    });

    it('should handle empty array', () => {
      expect(flatten([])).toEqual([]);
    });
  });

  describe('flattenDeep', () => {
    it('should completely flatten nested array', () => {
      expect(flattenDeep([1, [2, [3, [4, 5]]]])).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle empty array', () => {
      expect(flattenDeep([])).toEqual([]);
    });

    it('should handle non-nested array', () => {
      expect(flattenDeep([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });

  describe('intersection', () => {
    it('should find common elements', () => {
      expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
      expect(intersection(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual([
        'b',
        'c',
      ]);
    });

    it('should handle no intersection', () => {
      expect(intersection([1, 2], [3, 4])).toEqual([]);
    });

    it('should handle empty arrays', () => {
      expect(intersection([], [1, 2])).toEqual([]);
      expect(intersection([1, 2], [])).toEqual([]);
    });
  });

  describe('difference', () => {
    it('should find elements in first array but not second', () => {
      expect(difference([1, 2, 3], [2, 3, 4])).toEqual([1]);
      expect(difference(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['a']);
    });

    it('should handle no difference', () => {
      expect(difference([1, 2], [1, 2, 3])).toEqual([]);
    });

    it('should handle empty arrays', () => {
      expect(difference([], [1, 2])).toEqual([]);
      expect(difference([1, 2], [])).toEqual([1, 2]);
    });
  });

  describe('union', () => {
    it('should combine arrays without duplicates', () => {
      expect(union([1, 2], [2, 3])).toEqual([1, 2, 3]);
      expect(union(['a', 'b'], ['b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    it('should handle empty arrays', () => {
      expect(union([], [1, 2])).toEqual([1, 2]);
      expect(union([1, 2], [])).toEqual([1, 2]);
    });
  });

  describe('shuffle', () => {
    it('should return array with same length', () => {
      const arr = [1, 2, 3, 4, 5];
      const shuffled = shuffle(arr);
      expect(shuffled).toHaveLength(arr.length);
    });

    it('should not modify original array', () => {
      const arr = [1, 2, 3];
      const original = [...arr];
      shuffle(arr);
      expect(arr).toEqual(original);
    });

    it('should handle empty array', () => {
      expect(shuffle([])).toEqual([]);
    });

    it('should handle single element', () => {
      expect(shuffle([1])).toEqual([1]);
    });
  });

  describe('sample', () => {
    it('should return specified number of elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const sampled = sample(arr, 3);
      expect(sampled).toHaveLength(3);
      sampled.forEach(item => expect(arr).toContain(item));
    });

    it('should return all elements if count >= array length', () => {
      const arr = [1, 2, 3];
      const sampled = sample(arr, 5);
      expect(sampled).toHaveLength(3);
    });

    it('should default to 1 element', () => {
      const arr = [1, 2, 3];
      const sampled = sample(arr);
      expect(sampled).toHaveLength(1);
      expect(arr).toContain(sampled[0]);
    });

    it('should handle empty array', () => {
      expect(sample([])).toEqual([]);
    });
  });

  describe('groupBy', () => {
    it('should group objects by property', () => {
      const users = [
        { name: 'John', age: 25 },
        { name: 'Jane', age: 30 },
        { name: 'Bob', age: 25 },
      ];
      const grouped = groupBy(users, 'age');
      expect(grouped).toEqual({
        '25': [
          { name: 'John', age: 25 },
          { name: 'Bob', age: 25 },
        ],
        '30': [{ name: 'Jane', age: 30 }],
      });
    });

    it('should handle empty array', () => {
      expect(groupBy([], 'key')).toEqual({});
    });
  });

  describe('sum', () => {
    it('should calculate sum of numbers', () => {
      expect(sum([1, 2, 3, 4])).toBe(10);
      expect(sum([0, -1, 1])).toBe(0);
    });

    it('should handle empty array', () => {
      expect(sum([])).toBe(0);
    });

    it('should handle single element', () => {
      expect(sum([5])).toBe(5);
    });
  });

  describe('sumBy', () => {
    it('should calculate sum by property', () => {
      const items = [{ value: 10 }, { value: 20 }, { value: 30 }];
      expect(sumBy(items, 'value')).toBe(60);
    });

    it('should handle non-numeric values', () => {
      const items = [{ value: 10 }, { value: 'hello' }, { value: 20 }];
      expect(sumBy(items, 'value')).toBe(30);
    });

    it('should handle empty array', () => {
      expect(sumBy([], 'value')).toBe(0);
    });
  });
});
