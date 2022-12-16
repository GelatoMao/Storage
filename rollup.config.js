import babel from "@rollup/plugin-babel";

export default {
  input: "storage.js",
  output: [
    {
      file: "./es/index.js",
      format: "esm", // 将软件包保存为 ES 模块文件
      name: "cssModuleVue",
    },
    {
      file: "./dist/index.js",
      format: "cjs",
      name: "cssModuleVue",
      exports: "default",
    },
  ],
  watch: {
    exclude: "node_modules/**",
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
  ],
};
