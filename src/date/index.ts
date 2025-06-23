/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param format 格式化字符串 (默认: 'YYYY-MM-DD HH:mm:ss')
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  date: Date | number | string,
  format = 'YYYY-MM-DD HH:mm:ss'
): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  const tokens: Record<string, string> = {
    YYYY: d.getFullYear().toString(),
    MM: (d.getMonth() + 1).toString().padStart(2, '0'),
    DD: d.getDate().toString().padStart(2, '0'),
    HH: d.getHours().toString().padStart(2, '0'),
    mm: d.getMinutes().toString().padStart(2, '0'),
    ss: d.getSeconds().toString().padStart(2, '0'),
    SSS: d.getMilliseconds().toString().padStart(3, '0'),
  };

  return format.replace(
    /YYYY|MM|DD|HH|mm|ss|SSS/g,
    match => tokens[match] || match
  );
}

/**
 * 获取两个日期之间的天数差
 * @param date1 第一个日期
 * @param date2 第二个日期
 * @returns 天数差（正数表示date1晚于date2）
 */
export function daysBetween(
  date1: Date | number | string,
  date2: Date | number | string
): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new Error('Invalid date');
  }

  const diffTime = d1.getTime() - d2.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * 判断是否为今天
 * @param date 日期
 * @returns 是否为今天
 */
export function isToday(date: Date | number | string): boolean {
  const d = new Date(date);
  const today = new Date();

  if (isNaN(d.getTime())) {
    return false;
  }

  return d.toDateString() === today.toDateString();
}

/**
 * 判断是否为昨天
 * @param date 日期
 * @returns 是否为昨天
 */
export function isYesterday(date: Date | number | string): boolean {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (isNaN(d.getTime())) {
    return false;
  }

  return d.toDateString() === yesterday.toDateString();
}

/**
 * 获取日期的开始时间（00:00:00.000）
 * @param date 日期
 * @returns 日期的开始时间
 */
export function startOfDay(date: Date | number | string): Date {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * 获取日期的结束时间（23:59:59.999）
 * @param date 日期
 * @returns 日期的结束时间
 */
export function endOfDay(date: Date | number | string): Date {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * 添加天数
 * @param date 日期
 * @param days 要添加的天数
 * @returns 新的日期
 */
export function addDays(date: Date | number | string, days: number): Date {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  d.setDate(d.getDate() + days);
  return d;
}

/**
 * 添加月份
 * @param date 日期
 * @param months 要添加的月份
 * @returns 新的日期
 */
export function addMonths(date: Date | number | string, months: number): Date {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  d.setMonth(d.getMonth() + months);
  return d;
}

/**
 * 获取相对时间描述
 * @param date 日期
 * @param baseDate 基础日期（默认为当前时间）
 * @returns 相对时间描述
 */
export function getRelativeTime(
  date: Date | number | string,
  baseDate?: Date | number | string
): string {
  const d = new Date(date);
  const base = baseDate ? new Date(baseDate) : new Date();

  if (isNaN(d.getTime()) || isNaN(base.getTime())) {
    throw new Error('Invalid date');
  }

  const diffMs = base.getTime() - d.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) {
    return '刚刚';
  } else if (diffMins < 60) {
    return `${diffMins}分钟前`;
  } else if (diffHours < 24) {
    return `${diffHours}小时前`;
  } else if (diffDays < 7) {
    return `${diffDays}天前`;
  } else {
    return formatDate(d, 'YYYY-MM-DD');
  }
}
