import {
  deepClone,
  isEmpty,
  get,
  set,
  pick,
  omit,
  merge,
} from '../utils/object';

describe('Object utilities', () => {
  describe('deepClone', () => {
    it('should deep clone object', () => {
      const obj = { a: 1, b: { c: 2 } };
      const cloned = deepClone(obj);

      expect(cloned).toEqual(obj);
      expect(cloned).not.toBe(obj);
      expect(cloned.b).not.toBe(obj.b);
    });

    it('should handle arrays', () => {
      const arr = [1, [2, 3]];
      const cloned = deepClone(arr);

      expect(cloned).toEqual(arr);
      expect(cloned).not.toBe(arr);
      expect(cloned[1]).not.toBe(arr[1]);
    });

    it('should handle dates', () => {
      const date = new Date('2023-01-01');
      const cloned = deepClone(date);

      expect(cloned).toEqual(date);
      expect(cloned).not.toBe(date);
    });

    it('should handle regex', () => {
      const regex = /test/gi;
      const cloned = deepClone(regex);

      expect(cloned).toEqual(regex);
      expect(cloned).not.toBe(regex);
    });

    it('should handle primitives', () => {
      expect(deepClone(null)).toBe(null);
      expect(deepClone(undefined)).toBe(undefined);
      expect(deepClone(123)).toBe(123);
      expect(deepClone('string')).toBe('string');
      expect(deepClone(true)).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('should detect empty objects', () => {
      expect(isEmpty({})).toBe(true);
      expect(isEmpty({ a: 1 })).toBe(false);
    });

    it('should detect empty arrays', () => {
      expect(isEmpty([])).toBe(true);
      expect(isEmpty([1])).toBe(false);
    });

    it('should detect empty strings', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('hello')).toBe(false);
    });

    it('should detect empty Maps and Sets', () => {
      expect(isEmpty(new Map())).toBe(true);
      expect(isEmpty(new Set())).toBe(true);

      const map = new Map();
      map.set('key', 'value');
      expect(isEmpty(map)).toBe(false);

      const set = new Set();
      set.add('value');
      expect(isEmpty(set)).toBe(false);
    });

    it('should handle null and undefined', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });
  });

  describe('get', () => {
    const obj = {
      a: {
        b: {
          c: 'deep value',
        },
      },
      x: null,
      y: undefined,
    };

    it('should get nested property value', () => {
      expect(get(obj, 'a.b.c')).toBe('deep value');
    });

    it('should return default value for non-existent path', () => {
      expect(get(obj, 'a.b.d', 'default')).toBe('default');
      expect(get(obj, 'a.b.c.d', 'default')).toBe('default');
    });

    it('should handle null and undefined values', () => {
      expect(get(obj, 'x')).toBe(null);
      expect(get(obj, 'y')).toBe(undefined);
      expect(get(obj, 'y', 'default')).toBe('default');
    });

    it('should handle invalid inputs', () => {
      expect(get(null, 'a.b')).toBe(undefined);
      expect(get(obj, '')).toBe(undefined);
      expect(get(obj, null as any)).toBe(undefined);
    });
  });

  describe('set', () => {
    it('should set nested property value', () => {
      const obj = {};
      set(obj, 'a.b.c', 'value');
      expect(obj).toEqual({ a: { b: { c: 'value' } } });
    });

    it('should overwrite existing properties', () => {
      const obj = { a: { b: 'old' } };
      set(obj, 'a.b', 'new');
      expect(obj.a.b).toBe('new');
    });

    it('should handle root level properties', () => {
      const obj = {};
      set(obj, 'a', 'value');
      expect(obj).toEqual({ a: 'value' });
    });

    it('should handle invalid inputs', () => {
      expect(() => set(null, 'a.b', 'value')).not.toThrow();
      expect(() => set({}, '', 'value')).not.toThrow();
    });
  });

  describe('pick', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };

    it('should pick specified properties', () => {
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('should handle non-existent properties', () => {
      expect(pick(obj, ['a', 'x' as any])).toEqual({ a: 1 });
    });

    it('should handle empty keys array', () => {
      expect(pick(obj, [])).toEqual({});
    });
  });

  describe('omit', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };

    it('should omit specified properties', () => {
      expect(omit(obj, ['b', 'd'])).toEqual({ a: 1, c: 3 });
    });

    it('should handle non-existent properties', () => {
      expect(omit(obj, ['b', 'x' as any])).toEqual({ a: 1, c: 3, d: 4 });
    });

    it('should handle empty keys array', () => {
      expect(omit(obj, [])).toEqual(obj);
    });
  });

  describe('merge', () => {
    it('should merge objects deeply', () => {
      const target = { a: { x: 1 }, b: 2 };
      const source = { a: { y: 2 }, c: 3 } as any;
      const result = merge(target, source);

      expect(result).toEqual({
        a: { x: 1, y: 2 },
        b: 2,
        c: 3,
      });
    });

    it('should handle multiple sources', () => {
      const target = { a: 1 };
      const source1 = { b: 2 } as any;
      const source2 = { c: 3 } as any;
      const result = merge(target, source1, source2);

      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should overwrite non-object values', () => {
      const target = { a: 'string' };
      const source = { a: { b: 1 } } as any;
      const result = merge(target, source);

      expect(result).toEqual({ a: { b: 1 } });
    });

    it('should not mutate target object', () => {
      const target = { a: 1 };
      const source = { b: 2 } as any;
      const result = merge(target, source);

      expect(target).toEqual({ a: 1 });
      expect(result).toEqual({ a: 1, b: 2 });
    });

    it('should handle arrays as values', () => {
      const target = { a: [1, 2] };
      const source = { a: [3, 4] };
      const result = merge(target, source);

      expect(result).toEqual({ a: [3, 4] });
    });
  });
});
