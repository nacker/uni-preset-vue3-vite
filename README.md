# UniApp + Vite + Vue3 + Pinia + Unocss 多端项目模板

一个基于最新技术栈的UniApp项目模板，支持小程序、H5等多端开发，提供完整的开发工具链和最佳实践。

## ✨ 技术栈

- 🚀 核心框架: [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) + [UniApp](https://uniapp.dcloud.io/)
- 🍍 状态管理: [Pinia](https://pinia.vuejs.org/) + [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)
- 🌐 HTTP客户端: [Axios](https://axios-http.com/)
- 💅 UI组件: [NutUI-Uniapp](https://nutui-uniapp.pages.dev/)
- 🌍 国际化: [vue-i18n](https://vue-i18n.intlify.dev/)
- 🎨 原子化CSS: [UnoCSS](https://unocss.dev/)
- 🔌 自动导入: [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import) + [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

## 📁 项目结构

```
├── src
│   ├── api                  # API请求封装
│   │   ├── modules         # API模块
│   │   ├── request.js      # Axios实例
│   │   └── service.js      # 请求服务
│   ├── layouts             # 布局组件
│   ├── pages               # 页面组件
│   │   ├── home            # 首页
│   │   ├── interaction     # 交互页
│   │   ├── me              # 个人中心
│   │   └── user            # 用户相关
│   ├── static              # 静态资源
│   ├── store               # 状态管理
│   │   ├── app.js         # 应用状态
│   │   ├── count.js       # 示例状态
│   │   └── index.js       # Pinia实例
│   └── styles             # 全局样式
```

## 🚀 快速开始

### 环境准备

1. 确保已安装 [Node.js](https://nodejs.org/) (推荐 v18+)
2. 安装 [pnpm](https://pnpm.io/): `npm install -g pnpm`

### 开发运行

```bash
# 克隆项目
git clone https://github.com/nacker/uni-preset-vue3-vite.git

# 安装依赖
pnpm install

# 开发微信小程序
pnpm dev:mp-weixin

# 开发H5
pnpm dev:h5

# 开发支付宝小程序
pnpm dev:mp-alipay
```

### 生产构建

```bash
# 构建微信小程序
pnpm build:mp-weixin

# 构建H5
pnpm build:h5
```

## 📚 开发指南

### API使用

项目采用模块化API设计，所有API定义在`src/api/modules`目录下。使用示例：

```javascript
// 在组件中直接使用API
const { data, error, loading } = useRequest(API_user_login_post({ username, password }))
```

### 状态管理

使用Pinia进行状态管理，状态模块定义在`src/store`目录下。使用示例：

```javascript
// 在组件中使用store
const appStore = useAppStore()
const { theme } = storeToRefs(appStore)
```

### 样式指南

1. 优先使用UnoCSS原子类
2. 全局样式定义在`src/styles`目录
3. 组件样式使用scoped CSS

## 🛠️ 构建与部署

支持多种平台构建：

```bash
# 微信小程序
pnpm build:mp-weixin

# H5
pnpm build:h5

# 支付宝小程序
pnpm build:mp-alipay
```

## 📝 代码规范

### Git提交规范

遵循Conventional Commits规范：

- `✨ feat`: 新增功能
- `🐛 fix`: 修复bug
- `📝 docs`: 文档变更
- `💄 style`: 代码样式变更
- `♻️ refactor`: 代码重构
- `⚡️ perf`: 性能优化
- `✅ test`: 测试相关
- `🔧 chore`: 构建/工具变更

提交示例：

```bash
git add .
pnpm cz
```

## 🤝 贡献指南

1. Fork项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 提交Pull Request
>
