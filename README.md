# UniApp、Vite、Vue3、Pinia、Unocss 小程序、H5 项目模板

入门简单、开发简单、接近原生，适用于了解或不熟悉uniapp的开发人员去快速使用uniapp开发小程序、h5

## 特色

- ⚡️[uni-app](https://github.com/dcloudio/uni-app), [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/)

- 📦 [组件自动化引入](https://github.com/antfu/unplugin-vue-components)

- 🍍 [使用 Pinia 的状态管理](https://pinia.vuejs.org)

- 🎨 [UnoCSS](https://github.com/unocss/unocss) - 高性能且极具灵活性的即时原子化 CSS 引擎

- 😃 [各种图标集为你所用](https://icon-sets.iconify.design/)

- 🔥 使用 [新的 `<script setup>` 语法](https://github.com/vuejs/rfcs/pull/227)

- 📥 [API 自动加载](https://github.com/antfu/unplugin-auto-import) - 直接使用 Composition API 无需引入

- 🌍 [API 采用模块化自动导入方式](https://blog.csdn.net/qq_43775179/article/details/134811292) 根据demo.js文件设置接口，以API_xxx_method的方式命名，在请求时无需导入 直接使用useRequest()函数返回参数以解构的方式获取，拿到即为写入的接口

## 🍭 安装使用

🍙 获取项目代码

```bash
git clone https://github.com/nacker/uni-preset-vue3-vite.git
```

🌈 安装依赖

```bash
pnpm install
```

🐥 运行

```bash
pnpm dev:mp-weixin
```

🍁 打包

```bash
pnpm build:mp-weixin
```

🍄 Git 提交

```bash
pnpm cz
```

## 🍣 Git 规范

参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

- `✨ feat` 增加新功能
- `🐛 fix` 修复问题/BUG
- `🎉 init` 初始化
- `📝 docs` 文档变更
- `💄 style` 代码格式(不影响代码运行的变动)
- `♻️ refactor` 重构(既不是增加feature，也不是修复bug)
- `⚡️ perf` 性能优化
- `✅ test` 增加测试
- `⏪️ revert` 回退
- `🚀‍ build` 构建过程或辅助工具的变动
- `👷 ci` CI 配置

## 🌯 Git 提交流程

```bash
git add .

pnpm run cz
```