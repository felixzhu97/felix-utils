/**
 * 验证邮箱格式
 * @param email 邮箱地址
 * @returns 是否为有效邮箱
 */
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 验证手机号格式（中国大陆）
 * @param phone 手机号
 * @returns 是否为有效手机号
 */
export function isPhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * 验证身份证号格式（中国大陆）
 * @param idCard 身份证号
 * @returns 是否为有效身份证号
 */
export function isIdCard(idCard: string): boolean {
  const idCardRegex =
    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
  return idCardRegex.test(idCard);
}

/**
 * 验证URL格式
 * @param url URL地址
 * @returns 是否为有效URL
 */
export function isUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 验证IP地址格式
 * @param ip IP地址
 * @returns 是否为有效IP地址
 */
export function isIP(ip: string): boolean {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

/**
 * 验证密码强度
 * @param password 密码
 * @param options 验证选项
 * @returns 密码强度等级 (0-4)
 */
export function getPasswordStrength(
  password: string,
  options: {
    minLength?: number;
    requireLowercase?: boolean;
    requireUppercase?: boolean;
    requireNumbers?: boolean;
    requireSymbols?: boolean;
  } = {}
): number {
  const {
    minLength = 8,
    requireLowercase = true,
    requireUppercase = true,
    requireNumbers = true,
    requireSymbols = true,
  } = options;

  let strength = 0;

  // 长度检查
  if (password.length >= minLength) strength++;

  // 小写字母
  if (!requireLowercase || /[a-z]/.test(password)) strength++;

  // 大写字母
  if (!requireUppercase || /[A-Z]/.test(password)) strength++;

  // 数字
  if (!requireNumbers || /\d/.test(password)) strength++;

  // 特殊字符
  if (!requireSymbols || /[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  return Math.max(0, Math.min(4, strength));
}

/**
 * 验证中文字符
 * @param str 字符串
 * @returns 是否包含中文字符
 */
export function hasChinese(str: string): boolean {
  return /[\u4e00-\u9fa5]/.test(str);
}

/**
 * 验证纯中文
 * @param str 字符串
 * @returns 是否为纯中文
 */
export function isChineseOnly(str: string): boolean {
  return /^[\u4e00-\u9fa5]+$/.test(str);
}

/**
 * 验证数字
 * @param value 值
 * @returns 是否为数字
 */
export function isNumber(value: any): value is number {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
}

/**
 * 验证整数
 * @param value 值
 * @returns 是否为整数
 */
export function isInteger(value: any): value is number {
  return isNumber(value) && Number.isInteger(value);
}

/**
 * 验证正整数
 * @param value 值
 * @returns 是否为正整数
 */
export function isPositiveInteger(value: any): value is number {
  return isInteger(value) && value > 0;
}

/**
 * 验证日期格式
 * @param dateStr 日期字符串
 * @param format 日期格式
 * @returns 是否为有效日期
 */
export function isValidDate(dateStr: string, format?: string): boolean {
  if (format) {
    // 简单的格式验证，可以根据需要扩展
    const formatRegex = format
      .replace(/YYYY/g, "\\d{4}")
      .replace(/MM/g, "\\d{2}")
      .replace(/DD/g, "\\d{2}")
      .replace(/HH/g, "\\d{2}")
      .replace(/mm/g, "\\d{2}")
      .replace(/ss/g, "\\d{2}");

    if (!new RegExp(`^${formatRegex}$`).test(dateStr)) {
      return false;
    }
  }

  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

/**
 * 验证银行卡号
 * @param cardNumber 银行卡号
 * @returns 是否为有效银行卡号
 */
export function isBankCard(cardNumber: string): boolean {
  // 移除空格和连字符
  const cleanNumber = cardNumber.replace(/[\s-]/g, "");

  // 长度检查（通常13-19位）
  if (!/^\d{13,19}$/.test(cleanNumber)) {
    return false;
  }

  // Luhn算法验证
  let sum = 0;
  let shouldDouble = false;

  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit = (digit % 10) + 1;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

/**
 * 验证颜色值（HEX）
 * @param color 颜色值
 * @returns 是否为有效HEX颜色值
 */
export function isHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * 验证QQ号
 * @param qq QQ号
 * @returns 是否为有效QQ号
 */
export function isQQ(qq: string): boolean {
  return /^[1-9][0-9]{4,10}$/.test(qq);
}

/**
 * 验证微信号
 * @param wechat 微信号
 * @returns 是否为有效微信号
 */
export function isWechat(wechat: string): boolean {
  return /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/.test(wechat);
}

/**
 * 验证车牌号（中国）
 * @param plateNumber 车牌号
 * @returns 是否为有效车牌号
 */
export function isPlateNumber(plateNumber: string): boolean {
  // 普通车牌
  const normalRegex =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{4}[A-Z0-9挂学警港澳]$/;
  // 新能源车牌
  const newEnergyRegex =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{5}$/;

  return normalRegex.test(plateNumber) || newEnergyRegex.test(plateNumber);
}
