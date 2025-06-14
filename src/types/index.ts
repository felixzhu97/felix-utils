/**
 * 日期格式化选项
 */
export interface DateFormatOptions {
  format?: string;
  locale?: string;
  timezone?: string;
}

/**
 * 深拷贝支持的类型
 */
export type DeepCloneableType =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | RegExp
  | Array<any>
  | Record<string, any>;

/**
 * 防抖函数选项
 */
export interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

/**
 * 节流函数选项
 */
export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}
