import {
  debounce,
  throttle,
  memoize,
  retry,
  delay,
  once,
  curry,
  compose,
  pipe,
} from '../utils/function';

describe('Function utilities', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('debounce', () => {
    it('should debounce function calls', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced();
      debounced();

      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should call immediately with leading option', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100, { leading: true, trailing: false });

      debounced();
      expect(fn).toHaveBeenCalledTimes(1);

      debounced();
      debounced();
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should not call on trailing with trailing: false', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100, { trailing: false });

      debounced();
      jest.advanceTimersByTime(100);
      expect(fn).not.toHaveBeenCalled();
    });

    it('should have cancel method', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100) as any;

      debounced();
      debounced.cancel();
      jest.advanceTimersByTime(100);
      expect(fn).not.toHaveBeenCalled();
    });

    it('should have flush method', () => {
      const fn = jest.fn().mockReturnValue('result');
      const debounced = debounce(fn, 100) as any;

      debounced();
      const result = debounced.flush();
      expect(fn).toHaveBeenCalledTimes(1);
      expect(result).toBe('result');
    });
  });

  describe('throttle', () => {
    it('should throttle function calls', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100, { trailing: false });

      throttled();
      throttled();
      throttled();

      expect(fn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should respect leading option', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100, { leading: false });

      throttled();
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('memoize', () => {
    it('should cache function results', () => {
      const fn = jest.fn((x: number) => x * 2);
      const memoized = memoize(fn);

      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should use custom key generator', () => {
      const fn = jest.fn((obj: any) => obj.value);
      const memoized = memoize(fn, (obj: any) => obj.id);

      expect(memoized({ id: 1, value: 'a' })).toBe('a');
      expect(memoized({ id: 1, value: 'b' })).toBe('a'); // cached
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should have cache property', () => {
      const fn = jest.fn();
      const memoized = memoize(fn) as any;

      expect(memoized.cache).toBeDefined();
      expect(memoized.cache.size).toBe(0);
    });

    it('should have clear method', () => {
      const fn = jest.fn((x: number) => x);
      const memoized = memoize(fn) as any;

      memoized(1);
      expect(memoized.cache.size).toBe(1);

      memoized.clear();
      expect(memoized.cache.size).toBe(0);
    });
  });

  describe('retry', () => {
    beforeEach(() => {
      jest.useRealTimers();
    });

    it('should retry failed function', async () => {
      let attempt = 0;
      const fn = jest.fn().mockImplementation(async () => {
        attempt++;
        if (attempt < 3) {
          throw new Error('fail');
        }
        return 'success';
      });

      const result = await retry(fn, 3, 0);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('should throw after max retries', async () => {
      const fn = jest.fn().mockRejectedValue(new Error('always fail'));

      await expect(retry(fn, 2, 0)).rejects.toThrow('always fail');
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });

  describe('delay', () => {
    beforeEach(() => {
      jest.useRealTimers();
    });

    it('should delay execution', async () => {
      const start = Date.now();
      await delay(10);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(10);
    });
  });

  describe('once', () => {
    it('should only execute function once', () => {
      const fn = jest.fn().mockReturnValue('result');
      const onceFn = once(fn);

      expect(onceFn()).toBe('result');
      expect(onceFn()).toBe('result');
      expect(onceFn()).toBe('result');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should preserve arguments on first call', () => {
      const fn = jest.fn((a: number, b: number) => a + b);
      const onceFn = once(fn);

      expect(onceFn(1, 2)).toBe(3);
      expect(onceFn(3, 4)).toBe(3); // still returns first result
      expect(fn).toHaveBeenCalledWith(1, 2);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('curry', () => {
    it('should curry function', () => {
      const add = (a: number, b: number, c: number) => a + b + c;
      const curriedAdd = curry(add);

      expect(curriedAdd(1)(2)(3)).toBe(6);
      expect(curriedAdd(1, 2)(3)).toBe(6);
      expect(curriedAdd(1)(2, 3)).toBe(6);
      expect(curriedAdd(1, 2, 3)).toBe(6);
    });

    it('should handle custom arity', () => {
      const fn = (...args: number[]) => args.reduce((a, b) => a + b, 0);
      const curried = curry(fn, 3);

      expect(curried(1)(2)(3)).toBe(6);
    });
  });

  describe('compose', () => {
    it('should compose functions right to left', () => {
      const add1 = (x: number) => x + 1;
      const multiply2 = (x: number) => x * 2;
      const composed = compose(add1, multiply2);

      expect(composed(5)).toBe(11); // (5 * 2) + 1
    });

    it('should handle single function', () => {
      const add1 = (x: number) => x + 1;
      const composed = compose(add1);

      expect(composed(5)).toBe(6);
    });
  });

  describe('pipe', () => {
    it('should pipe functions left to right', () => {
      const add1 = (x: number) => x + 1;
      const multiply2 = (x: number) => x * 2;
      const piped = pipe(add1, multiply2);

      expect(piped(5)).toBe(12); // (5 + 1) * 2
    });

    it('should handle single function', () => {
      const add1 = (x: number) => x + 1;
      const piped = pipe(add1);

      expect(piped(5)).toBe(6);
    });
  });
});
