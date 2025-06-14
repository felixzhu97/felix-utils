# 贡献指南

感谢您对 Felix Utils 的关注！我们欢迎所有形式的贡献。

## 开发环境设置

1. Fork 本仓库到您的 GitHub 账号
2. 克隆 Fork 的仓库到本地：
   ```bash
   git clone https://github.com/yourusername/felix-utils.git
   cd felix-utils
   ```
3. 安装依赖：
   ```bash
   npm install
   ```
4. 创建功能分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 开发流程

### 代码规范

我们使用以下工具来保证代码质量：

- **ESLint**: 代码检查
- **Prettier**: 代码格式化
- **TypeScript**: 类型检查
- **Jest**: 单元测试

### 开发命令

```bash
# 开发模式（监听文件变化）
npm run dev

# 运行测试
npm test

# 类型检查
npm run typecheck

# 代码检查
npm run lint

# 自动修复格式问题
npm run lint:fix

# 格式化代码
npm run format
```

### 提交代码

1. 确保所有测试通过：

   ```bash
   npm test
   ```

2. 确保代码通过检查：

   ```bash
   npm run lint
   npm run typecheck
   ```

3. 格式化代码：

   ```bash
   npm run format
   ```

4. 提交更改：
   ```bash
   git add .
   git commit -m "feat: add new utility function"
   ```

### 提交消息规范

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 错误修复
- `docs:` 文档更新
- `style:` 代码格式修改
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

## 贡献类型

### 🐛 报告 Bug

请使用 [Bug Report 模板](https://github.com/yourusername/felix-utils/issues/new?template=bug_report.md) 创建 issue。

包含以下信息：

- 清晰的问题描述
- 重现步骤
- 期望行为
- 实际行为
- 环境信息（Node.js 版本、操作系统等）

### 💡 功能请求

请使用 [Feature Request 模板](https://github.com/yourusername/felix-utils/issues/new?template=feature_request.md) 创建 issue。

包含以下信息：

- 功能描述
- 使用场景
- 可能的实现方案
- 示例代码

### 📖 改进文档

文档改进包括：

- README 更新
- API 文档完善
- 示例代码添加
- 注释改进

### 🔧 添加新功能

添加新工具函数时，请确保：

1. **完整的 TypeScript 类型定义**
2. **完善的 JSDoc 注释**
3. **单元测试覆盖**
4. **在主入口文件中导出**

示例：

```typescript
/**
 * 检查数组是否为空
 * @param arr 要检查的数组
 * @returns 数组是否为空
 * @example
 * isEmptyArray([]) // true
 * isEmptyArray([1, 2]) // false
 */
export function isEmptyArray<T>(arr: T[]): boolean {
  return Array.isArray(arr) && arr.length === 0;
}
```

对应的测试：

```typescript
describe('isEmptyArray', () => {
  it('should return true for empty array', () => {
    expect(isEmptyArray([])).toBe(true);
  });

  it('should return false for non-empty array', () => {
    expect(isEmptyArray([1, 2, 3])).toBe(false);
  });
});
```

## Pull Request 流程

1. **创建 PR** 前确保：

   - 所有测试通过
   - 代码通过 ESLint 检查
   - 代码格式符合 Prettier 规范
   - 有适当的测试覆盖

2. **PR 描述** 应包含：

   - 更改内容概述
   - 关闭的 issue 编号（如有）
   - 测试说明
   - 相关截图（如适用）

3. **代码审查** 过程中：
   - 及时回应审查意见
   - 根据反馈进行修改
   - 保持友好和开放的态度

## 发布流程

维护者将按照以下流程发布新版本：

1. 合并 PR 到 main 分支
2. 运行完整测试套件
3. 更新版本号（遵循 [Semantic Versioning](https://semver.org/)）
4. 创建 Git tag
5. 自动发布到 npm（通过 GitHub Actions）

## 社区准则

请遵守我们的行为准则：

- 保持友好和尊重
- 接受建设性批评
- 专注于对社区最有利的事情
- 对其他社区成员表现出同理心

## 需要帮助？

如果您有任何问题，请随时：

- 创建 [GitHub Issue](https://github.com/yourusername/felix-utils/issues)
- 在现有 Issue 或 PR 中评论
- 通过邮件联系维护者

感谢您的贡献！ 🎉
