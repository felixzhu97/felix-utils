import type { DebounceOptions, ThrottleOptions } from '../types';

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间（毫秒）
 * @param options 选项
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: DebounceOptions = {}
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: any;
  let result: ReturnType<T>;

  const { leading: leadingOption = false, trailing = true } = options;

  const invokeFunc = (): ReturnType<T> => {
    const args = lastArgs!;
    const thisArg = lastThis;

    lastArgs = null;
    lastThis = null;
    result = func.apply(thisArg, args);
    return result;
  };

  const leadingEdge = (): ReturnType<T> => {
    timeoutId = setTimeout(timerExpired, wait);
    return leadingOption ? invokeFunc() : result;
  };

  const timerExpired = (): ReturnType<T> | void => {
    timeoutId = null;
    if (trailing && lastArgs) {
      return invokeFunc();
    }
    lastArgs = null;
    lastThis = null;
    return result;
  };

  const cancel = (): void => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    lastArgs = null;
    lastThis = null;
    timeoutId = null;
  };

  const flush = (): ReturnType<T> => {
    return timeoutId === null ? result : (timerExpired() as ReturnType<T>);
  };

  const debounced = function (
    this: any,
    ...args: Parameters<T>
  ): ReturnType<T> {
    lastArgs = args;
    lastThis = this;

    if (timeoutId === null) {
      return leadingEdge();
    }

    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(timerExpired, wait);

    return result;
  } as T;

  (debounced as any).cancel = cancel;
  (debounced as any).flush = flush;

  return debounced;
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param wait 等待时间（毫秒）
 * @param options 选项
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: ThrottleOptions = {}
): T {
  const { leading = true, trailing = true } = options;
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  });
}

/**
 * 函数缓存
 * @param func 要缓存的函数
 * @param keyGenerator 键生成器
 * @returns 缓存后的函数
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  const memoized = function (this: any, ...args: Parameters<T>): ReturnType<T> {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  } as T;

  (memoized as any).cache = cache;
  (memoized as any).clear = () => cache.clear();

  return memoized;
}

/**
 * 函数重试
 * @param func 要重试的函数
 * @param times 重试次数
 * @param delay 重试延迟（毫秒）
 * @returns Promise结果
 */
export async function retry<T>(
  func: () => Promise<T>,
  times = 3,
  delay = 1000
): Promise<T> {
  let lastError: any;

  for (let i = 0; i < times; i++) {
    try {
      return await func();
    } catch (error) {
      lastError = error;
      if (i < times - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * 延迟执行
 * @param ms 延迟时间（毫秒）
 * @returns Promise
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 函数只执行一次
 * @param func 要执行的函数
 * @returns 包装后的函数
 */
export function once<T extends (...args: any[]) => any>(func: T): T {
  let called = false;
  let result: ReturnType<T>;

  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!called) {
      called = true;
      result = func(...args);
    }
    return result;
  }) as T;
}

/**
 * 柯里化函数
 * @param func 要柯里化的函数
 * @param arity 参数个数
 * @returns 柯里化后的函数
 */
export function curry<T extends (...args: any[]) => any>(
  func: T,
  arity = func.length
): any {
  return function curried(this: any, ...args: any[]): any {
    if (args.length >= arity) {
      return func.apply(this, args);
    }
    return (...nextArgs: any[]) => curried.apply(this, [...args, ...nextArgs]);
  };
}

/**
 * 函数组合
 * @param funcs 要组合的函数数组
 * @returns 组合后的函数
 */
export function compose<T>(...funcs: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => funcs.reduceRight((acc, func) => func(acc), arg);
}

/**
 * 管道函数
 * @param funcs 要管道的函数数组
 * @returns 管道后的函数
 */
export function pipe<T>(...funcs: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => funcs.reduce((acc, func) => func(acc), arg);
}
