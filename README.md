# Felix Utils

一个实用的 JavaScript/TypeScript 工具库，包含常用的工具方法和日期处理功能。

## 特性

- 🚀 TypeScript 原生支持
- 📦 支持 CommonJS 和 ES Module
- 🎯 Tree-shaking 友好
- 📝 完整的类型定义
- ✅ 单元测试覆盖
- 📖 详细的文档

## 安装

```bash
npm install felix-utils
```

或者使用 yarn：

```bash
yarn add felix-utils
```

## 使用方法

### 导入方式

```javascript
// 导入所有工具
import * as felixUtils from "felix-utils";

// 导入特定模块
import { formatDate, debounce, deepClone } from "felix-utils";

// 按需导入（推荐）
import { formatDate } from "felix-utils/date";
import { debounce } from "felix-utils/utils";
```

## 功能模块

### 📅 日期处理 (Date)

```javascript
import {
  formatDate,
  daysBetween,
  isToday,
  getRelativeTime,
} from "felix-utils/date";

// 格式化日期
formatDate(new Date(), "YYYY-MM-DD HH:mm:ss"); // '2023-12-25 15:30:45'

// 计算日期差
daysBetween("2023-12-25", "2023-12-20"); // 5

// 判断是否为今天
isToday(new Date()); // true

// 获取相对时间
getRelativeTime(new Date(Date.now() - 60000)); // '1分钟前'
```

### 🛠️ 对象工具 (Object)

```javascript
import { deepClone, get, set, pick, omit } from "felix-utils/utils";

// 深拷贝
const cloned = deepClone({ a: { b: 1 } });

// 获取嵌套属性
get({ a: { b: 1 } }, "a.b"); // 1

// 设置嵌套属性
const obj = {};
set(obj, "a.b.c", "value");

// 选择属性
pick({ a: 1, b: 2, c: 3 }, ["a", "b"]); // { a: 1, b: 2 }

// 排除属性
omit({ a: 1, b: 2, c: 3 }, ["a"]); // { b: 2, c: 3 }
```

### 📋 数组工具 (Array)

```javascript
import { unique, chunk, flatten, groupBy } from "felix-utils/utils";

// 数组去重
unique([1, 2, 2, 3]); // [1, 2, 3]

// 数组分块
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// 数组扁平化
flatten([
  [1, 2],
  [3, 4],
]); // [1, 2, 3, 4]

// 按属性分组
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 25 },
];
groupBy(users, "age"); // { '25': [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 25 }] }
```

### 🔤 字符串工具 (String)

```javascript
import {
  camelCase,
  kebabCase,
  truncate,
  randomString,
} from "felix-utils/utils";

// 驼峰命名
camelCase("hello-world"); // 'helloWorld'

// 短横线命名
kebabCase("helloWorld"); // 'hello-world'

// 字符串截取
truncate("Hello World", 5); // 'Hello...'

// 随机字符串
randomString(8); // 'aBc12XyZ'
```

### 🔧 函数工具 (Function)

```javascript
import { debounce, throttle, memoize, retry } from "felix-utils/utils";

// 防抖
const debouncedFn = debounce(() => console.log("执行"), 300);

// 节流
const throttledFn = throttle(() => console.log("执行"), 300);

// 缓存
const memoizedFn = memoize((x, y) => x + y);

// 重试
retry(() => fetch("/api/data"), 3, 1000);
```

### 🔢 数值工具 (Number)

```javascript
import { random, formatThousands, clamp, average } from "felix-utils/utils";

// 随机数
random(1, 10); // 1-10之间的随机整数

// 千分位格式化
formatThousands(1234567); // '1,234,567'

// 数值限制
clamp(15, 0, 10); // 10

// 计算平均值
average([1, 2, 3, 4, 5]); // 3
```

### ✅ 验证工具 (Validate)

```javascript
import { isEmail, isPhone, isIdCard, isUrl } from "felix-utils/utils";

// 验证邮箱
isEmail("user@example.com"); // true

// 验证手机号
isPhone("13800138000"); // true

// 验证身份证
isIdCard("110101199001011234"); // true

// 验证URL
isUrl("https://www.example.com"); // true
```

## API 文档

### 日期处理

| 函数              | 说明           | 参数                | 返回值    |
| ----------------- | -------------- | ------------------- | --------- |
| `formatDate`      | 格式化日期     | `(date, format?)`   | `string`  |
| `daysBetween`     | 计算日期差     | `(date1, date2)`    | `number`  |
| `isToday`         | 判断是否为今天 | `(date)`            | `boolean` |
| `isYesterday`     | 判断是否为昨天 | `(date)`            | `boolean` |
| `addDays`         | 添加天数       | `(date, days)`      | `Date`    |
| `addMonths`       | 添加月份       | `(date, months)`    | `Date`    |
| `getRelativeTime` | 获取相对时间   | `(date, baseDate?)` | `string`  |

更多 API 请查看类型定义文件。

## 开发

```bash
# 安装依赖
npm install

# 开发模式构建
npm run dev

# 运行测试
npm test

# 构建
npm run build

# 代码检查
npm run lint

# 发布
npm publish
```

## 贡献

欢迎贡献代码！请先阅读贡献指南。

1. Fork 这个仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

## 更新日志

### 1.0.0

- 初始版本
- 包含日期处理、对象操作、数组工具、字符串处理、函数工具、数值操作和验证工具
