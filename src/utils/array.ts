/**
 * 数组去重
 * @param arr 数组
 * @returns 去重后的数组
 */
export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

/**
 * 根据属性去重
 * @param arr 对象数组
 * @param key 属性键
 * @returns 去重后的数组
 */
export function uniqueBy<T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  key: K
): T[] {
  const seen = new Set();
  return arr.filter(item => {
    const val = item[key];
    if (seen.has(val)) {
      return false;
    }
    seen.add(val);
    return true;
  });
}

/**
 * 数组分块
 * @param arr 数组
 * @param size 块大小
 * @returns 分块后的二维数组
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  if (size <= 0) return [];

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/**
 * 数组扁平化
 * @param arr 多维数组
 * @param depth 扁平化深度
 * @returns 扁平化后的数组
 */
export function flatten<T>(arr: any[], depth = 1): T[] {
  if (depth <= 0) return arr.slice();

  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flatten(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

/**
 * 完全扁平化数组
 * @param arr 多维数组
 * @returns 完全扁平化后的数组
 */
export function flattenDeep<T>(arr: any[]): T[] {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flattenDeep(val));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}

/**
 * 数组交集
 * @param arr1 第一个数组
 * @param arr2 第二个数组
 * @returns 交集数组
 */
export function intersection<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => set2.has(item));
}

/**
 * 数组差集
 * @param arr1 第一个数组
 * @param arr2 第二个数组
 * @returns 差集数组（arr1中有但arr2中没有的元素）
 */
export function difference<T>(arr1: T[], arr2: T[]): T[] {
  const set2 = new Set(arr2);
  return arr1.filter(item => !set2.has(item));
}

/**
 * 数组并集
 * @param arr1 第一个数组
 * @param arr2 第二个数组
 * @returns 并集数组
 */
export function union<T>(arr1: T[], arr2: T[]): T[] {
  return unique([...arr1, ...arr2]);
}

/**
 * 随机打乱数组
 * @param arr 数组
 * @returns 打乱后的新数组
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j]!;
    result[j] = temp!;
  }
  return result;
}

/**
 * 从数组中随机选择元素
 * @param arr 数组
 * @param count 选择的数量
 * @returns 随机选择的元素数组
 */
export function sample<T>(arr: T[], count = 1): T[] {
  if (count >= arr.length) return shuffle(arr);

  const shuffled = shuffle(arr);
  return shuffled.slice(0, count);
}

/**
 * 按属性分组
 * @param arr 对象数组
 * @param key 分组属性键
 * @returns 分组后的对象
 */
export function groupBy<T extends Record<string, any>, K extends keyof T>(
  arr: T[],
  key: K
): Record<string, T[]> {
  return arr.reduce(
    (groups, item) => {
      const groupKey = String(item[key]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
}

/**
 * 数组求和
 * @param arr 数字数组
 * @returns 总和
 */
export function sum(arr: number[]): number {
  return arr.reduce((acc, val) => acc + val, 0);
}

/**
 * 按属性求和
 * @param arr 对象数组
 * @param key 数值属性键
 * @returns 总和
 */
export function sumBy<T extends Record<string, any>>(
  arr: T[],
  key: keyof T
): number {
  return arr.reduce((acc, item) => {
    const val = item[key];
    return acc + (typeof val === 'number' ? val : 0);
  }, 0);
}
