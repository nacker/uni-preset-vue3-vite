<template>
  <view class="page-container">
    <view class="header">
      <image class="app-logo" src="/static/logo.png" />
      <text class="version">版本：1.0.0</text>
    </view>

    <nut-cell-group title="">
      <nut-cell
        title="隐私政策"
        is-link
        @click="navigateToPrivacyPolicy"
      />
      <nut-cell
        title="用户协议"
        is-link
        @click="navigateToUserAgreement"
      />
    </nut-cell-group>
  </view>
</template>

<script setup lang="ts">
const navigateToPrivacyPolicy = () => {
  uni.navigateTo({
    url: '/pages/webview/webview?url=https://www.baidu.com'
  });
};

const navigateToUserAgreement = () => {
  uni.navigateTo({
    url: '/pages/webview/webview?url=https://www.baidu.com'
  });
};
</script>

<style scoped>
.page-container {
  padding: 20rpx;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 130rpx;

  .app-logo {
    width: 180rpx;
    height: 180rpx;
  }

  .version {
    margin-top: 20rpx;
    font-size: 16rpx;
    color: #666;
  }
}

/* 新增居中样式 */
:deep(.nut-cell-group__wrap) {
  margin-top: 250rpx;
  //margin: 0 auto;
}

:deep(.nut-cell) {
  justify-content: center;
}
</style>
