<template>
  <view class="page-container">
    <!-- 页面容器 -->
    <view class="header">
      <!-- 应用logo和版本号 -->
      <image class="app-logo" src="/static/logo.png" />
      <text class="version">版本：1.0.0</text>
    </view>

    <!-- 设置选项 -->
    <nut-cell-group title="设置">
      <!-- 隐私政策链接 -->
      <nut-cell title="隐私政策" is-link @click="navigateToPrivacyPolicy" />
      <!-- 用户协议链接 -->
      <nut-cell title="用户协议" is-link @click="navigateToUserAgreement" />
    </nut-cell-group>
  </view>
</template>

<script setup lang="ts">
// 跳转到内部隐私政策页面（修改后）
const navigateToPrivacyPolicy = () => {
  uni.navigateTo({
    url: '/pages/webview/webview?url=https://www.baidu.com'
  });
};

// 跳转到用户协议页面（修改后）
const navigateToUserAgreement = () => {
  uni.navigateTo({
    url: '/pages/webview/webview?url=https://www.baidu.com'
  });
};
</script>

<style scoped>
  /* 页面容器样式 */
  .page-container {
    padding: 20rpx; /* 容器内边距，四周各20rpx */
  }

  /* 头部区域样式 */
  .header {
    display: flex; /* 启用弹性布局 */
    flex-direction: column; /* 子元素垂直排列 */
    align-items: center; /* 子元素水平居中对齐 */
    margin-top: 100rpx; /* 顶部外边距100rpx */
    margin-bottom: 20rpx; /* 底部外边距20rpx */

    /* 应用logo样式 */
    .app-logo {
      width: 120rpx; /* logo宽度100rpx */
      height: 120rpx; /* logo高度100rpx */
    }

    /* 版本号文本样式 */
    .version {
      margin-top: 10rpx; /* 顶部外边距10rpx */
      font-size: 14rpx; /* 字体大小14rpx */
      color: #666; /* 字体颜色浅灰色 */
    }
  }
</style>
