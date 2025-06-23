/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写的字符串
 */
export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * 驼峰转换
 * @param str 字符串
 * @returns 驼峰格式的字符串
 */
export function camelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, char => char.toLowerCase());
}

/**
 * 短横线连接
 * @param str 字符串
 * @returns 短横线连接的字符串
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * 下划线连接
 * @param str 字符串
 * @returns 下划线连接的字符串
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * 帕斯卡命名法
 * @param str 字符串
 * @returns 帕斯卡格式的字符串
 */
export function pascalCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[a-z]/, char => char.toUpperCase());
}

/**
 * 字符串截取（支持中文）
 * @param str 字符串
 * @param length 截取长度
 * @param suffix 后缀
 * @returns 截取后的字符串
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (!str || str.length <= length) return str;
  return str.slice(0, length) + suffix;
}

/**
 * 移除字符串两端的空白字符
 * @param str 字符串
 * @param chars 要移除的字符集合
 * @returns 处理后的字符串
 */
export function trim(str: string, chars?: string): string {
  if (!chars) return str.trim();

  const charSet = new Set(chars.split(''));
  let start = 0;
  let end = str.length - 1;

  while (start <= end && charSet.has(str[start]!)) {
    start++;
  }

  while (end >= start && charSet.has(str[end]!)) {
    end--;
  }

  return str.slice(start, end + 1);
}

/**
 * 字符串填充
 * @param str 字符串
 * @param length 目标长度
 * @param chars 填充字符
 * @param type 填充类型
 * @returns 填充后的字符串
 */
export function pad(
  str: string,
  length: number,
  chars = ' ',
  type: 'start' | 'end' | 'both' = 'start'
): string {
  if (str.length >= length) return str;

  const padLength = length - str.length;

  switch (type) {
    case 'start': {
      return chars.repeat(Math.ceil(padLength)).slice(0, padLength) + str;
    }
    case 'end': {
      return str + chars.repeat(Math.ceil(padLength)).slice(0, padLength);
    }
    case 'both': {
      const leftPad = Math.floor(padLength / 2);
      const rightPad = padLength - leftPad;
      return (
        chars.repeat(Math.ceil(leftPad)).slice(0, leftPad) +
        str +
        chars.repeat(Math.ceil(rightPad)).slice(0, rightPad)
      );
    }
    default:
      return str;
  }
}

/**
 * 生成随机字符串
 * @param length 长度
 * @param chars 字符集合
 * @returns 随机字符串
 */
export function randomString(
  length: number,
  chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 字符串模板替换
 * @param template 模板字符串
 * @param data 数据对象
 * @returns 替换后的字符串
 */
export function template(template: string, data: Record<string, any>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? String(data[key]) : match;
  });
}

/**
 * 字符串转义HTML
 * @param str 字符串
 * @returns 转义后的字符串
 */
export function escapeHtml(str: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return str.replace(/[&<>"']/g, char => htmlEscapes[char] || char);
}

/**
 * HTML反转义
 * @param str 字符串
 * @returns 反转义后的字符串
 */
export function unescapeHtml(str: string): string {
  const htmlUnescapes: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };

  return str.replace(
    /&(?:amp|lt|gt|quot|#39);/g,
    entity => htmlUnescapes[entity] || entity
  );
}

/**
 * 计算字符串字节长度（中文按2字节计算）
 * @param str 字符串
 * @returns 字节长度
 */
export function byteLength(str: string): number {
  let length = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode <= 0x007f) {
      length += 1;
    } else if (charCode <= 0x07ff) {
      length += 2;
    } else if (charCode <= 0xffff) {
      length += 3;
    } else {
      length += 4;
    }
  }
  return length;
}
