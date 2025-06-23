/**
 * 生成随机数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机数
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 生成随机浮点数
 * @param min 最小值
 * @param max 最大值
 * @param precision 精度
 * @returns 随机浮点数
 */
export function randomFloat(min: number, max: number, precision = 2): number {
  const num = Math.random() * (max - min) + min;
  return Number(num.toFixed(precision));
}

/**
 * 数值格式化
 * @param num 数值
 * @param precision 小数位数
 * @returns 格式化后的数值
 */
export function formatNumber(num: number, precision = 2): string {
  return num.toFixed(precision);
}

/**
 * 千分位格式化
 * @param num 数值
 * @param separator 分隔符
 * @returns 格式化后的字符串
 */
export function formatThousands(num: number, separator = ','): string {
  const parts = num.toString().split('.');
  parts[0] = parts[0]!.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return parts.join('.');
}

/**
 * 数值转百分比
 * @param num 数值
 * @param precision 小数位数
 * @returns 百分比字符串
 */
export function toPercent(num: number, precision = 2): string {
  return (num * 100).toFixed(precision) + '%';
}

/**
 * 限制数值范围
 * @param num 数值
 * @param min 最小值
 * @param max 最大值
 * @returns 限制后的数值
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

/**
 * 判断是否为偶数
 * @param num 数值
 * @returns 是否为偶数
 */
export function isEven(num: number): boolean {
  return num % 2 === 0;
}

/**
 * 判断是否为奇数
 * @param num 数值
 * @returns 是否为奇数
 */
export function isOdd(num: number): boolean {
  return num % 2 !== 0;
}

/**
 * 计算平均值
 * @param numbers 数值数组
 * @returns 平均值
 */
export function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
}

/**
 * 计算方差
 * @param numbers 数值数组
 * @returns 方差
 */
export function variance(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  const avg = average(numbers);
  return (
    numbers.reduce((sum, num) => sum + Math.pow(num - avg, 2), 0) /
    numbers.length
  );
}

/**
 * 计算标准差
 * @param numbers 数值数组
 * @returns 标准差
 */
export function standardDeviation(numbers: number[]): number {
  return Math.sqrt(variance(numbers));
}

/**
 * 计算中位数
 * @param numbers 数值数组
 * @returns 中位数
 */
export function median(numbers: number[]): number {
  if (numbers.length === 0) return 0;

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 === 0
    ? (sorted[mid - 1]! + sorted[mid]!) / 2
    : sorted[mid]!;
}

/**
 * 数值转文件大小格式
 * @param bytes 字节数
 * @param precision 精度
 * @returns 文件大小字符串
 */
export function formatFileSize(bytes: number, precision = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(precision)) + ' ' + sizes[i]
  );
}

/**
 * 计算两点之间的距离
 * @param x1 第一个点的x坐标
 * @param y1 第一个点的y坐标
 * @param x2 第二个点的x坐标
 * @param y2 第二个点的y坐标
 * @returns 距离
 */
export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * 角度转弧度
 * @param degrees 角度
 * @returns 弧度
 */
export function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * 弧度转角度
 * @param radians 弧度
 * @returns 角度
 */
export function toDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

/**
 * 计算最大公约数
 * @param a 第一个数
 * @param b 第二个数
 * @returns 最大公约数
 */
export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * 计算最小公倍数
 * @param a 第一个数
 * @param b 第二个数
 * @returns 最小公倍数
 */
export function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}
