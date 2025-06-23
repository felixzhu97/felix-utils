import typescript from 'rollup-plugin-typescript2';
import { dts } from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';

const utilModules = [
  'array',
  'object',
  'string',
  'function',
  'number',
  'validate',
];

// 生产环境压缩配置
const terserConfig = {
  compress: {
    drop_console: true, // 移除console
    drop_debugger: true, // 移除debugger
    pure_funcs: ['console.log', 'console.info', 'console.debug'], // 移除特定函数调用
    passes: 2, // 多轮压缩
  },
  mangle: {
    properties: {
      regex: /^_/, // 混淆以_开头的私有属性
    },
  },
  format: {
    comments: false, // 移除注释
  },
};

// TypeScript 配置
const tsConfig = {
  tsconfig: './tsconfig.json',
  tsconfigOverride: {
    compilerOptions: {
      declaration: false,
      declarationMap: false,
      sourceMap: false,
      removeComments: true,
      stripInternal: true,
      strict: false, // 暂时关闭严格模式
      noUnusedLocals: false, // 关闭未使用变量检查
      noUnusedParameters: false, // 关闭未使用参数检查
      exactOptionalPropertyTypes: false,
      noUncheckedIndexedAccess: false,
    },
  },
  useTsconfigDeclarationDir: false,
  clean: true,
};

// 主入口配置 - 只生成ESM版本
const mainConfig = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: false, // 禁用sourcemap
      compact: true, // 紧凑输出
    },
    plugins: [typescript(tsConfig), terser(terserConfig)],
    external: [],
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false,
    },
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
];

// 工具模块配置 - 只生成ESM版本
const utilConfigs = utilModules.flatMap(moduleName => [
  {
    input: `src/utils/${moduleName}.ts`,
    output: {
      file: `dist/utils/${moduleName}.esm.js`,
      format: 'esm',
      sourcemap: false,
      compact: true,
    },
    plugins: [typescript(tsConfig), terser(terserConfig)],
    external: [],
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false,
    },
  },
  {
    input: `src/utils/${moduleName}.ts`,
    output: {
      file: `dist/utils/${moduleName}.d.ts`,
      format: 'esm',
    },
    plugins: [dts()],
  },
]);

// 日期模块配置 - 只生成ESM版本
const dateConfigs = [
  {
    input: 'src/date/index.ts',
    output: {
      file: 'dist/date/index.esm.js',
      format: 'esm',
      sourcemap: false,
      compact: true,
    },
    plugins: [typescript(tsConfig), terser(terserConfig)],
    external: [],
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      tryCatchDeoptimization: false,
    },
  },
  {
    input: 'src/date/index.ts',
    output: {
      file: 'dist/date/index.d.ts',
      format: 'esm',
    },
    plugins: [dts()],
  },
];

export default [...mainConfig, ...utilConfigs, ...dateConfigs];
