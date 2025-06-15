<template>
  <!-- 主容器，包裹页面所有内容 -->
  <view class="container">
    <!-- 顶部广告区域 (已移除广告内容，保留结构)，可用于后续添加广告或其他内容 -->
    <view class="ad-banner">
      <!-- 这里可以放置其他内容或完全移除 -->
    </view>

    <!-- 去水印操作区，包含视频链接输入框和操作按钮 -->
    <view class="operation-area">
      <!-- 视频链接输入框，用于用户输入视频或图集链接 -->
      <nut-input
        v-model="videoUrl"
        placeholder="长按粘贴视频或图集链接"
        clearable
        class="input-box"
      />

      <!-- 操作按钮组，包含去水印和粘贴按钮 -->
      <view class="action-buttons">
        <!-- 去水印按钮，点击触发去水印操作 -->
        <nut-button
          type="primary"
          @click="handleRemoveWatermark"
          class="action-btn"
        >
          去水印
        </nut-button>

        <!-- 粘贴按钮，点击从剪贴板粘贴内容到输入框 -->
        <nut-button
          plain
          @click="handlePaste"
          class="action-btn"
        >
          粘贴
        </nut-button>
      </view>
    </view>

    <!-- 功能按钮区，展示多个功能入口 -->
    <view class="feature-buttons">
      <!-- 使用NutUI的网格布局，将功能按钮按5列排列 -->
      <nut-grid :column-num="5">
        <!-- 图集功能入口 -->
        <nut-grid-item>
          <image src="/static/icon-album.png" mode="aspectFit" />
          <text>图集</text>
        </nut-grid-item>

        <!-- 备用去水印功能入口 -->
        <nut-grid-item>
          <image src="/static/icon-backup.png" mode="aspectFit" />
          <text>备用去水印</text>
        </nut-grid-item>

        <!-- 解析记录功能入口，可查看历史解析记录 -->
        <nut-grid-item>
          <image src="/static/icon-history.png" mode="aspectFit" />
          <text>解析记录</text>
        </nut-grid-item>

        <!-- 使用教程功能入口，引导用户如何使用应用 -->
        <nut-grid-item>
          <image src="/static/icon-tutorial.png" mode="aspectFit" />
          <text>使用教程</text>
        </nut-grid-item>

        <!-- 分享功能入口，用于分享应用给他人 -->
        <nut-grid-item>
          <image src="/static/icon-share.png" mode="aspectFit" />
          <text>分享</text>
        </nut-grid-item>
      </nut-grid>
    </view>

    <!-- 底部声明，说明视频版权归属和应用数据存储情况 -->
    <view class="footer">
      <text>视频归平台及作者所有，本应用不储存任何视频及图片</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

/**
 * 视频链接输入框的绑定值，使用 ref 创建响应式变量
 */
const videoUrl = ref('');

/**
 * 处理去水印功能
 * 显示加载状态，模拟API调用，1.5秒后显示完成提示
 */
const handleRemoveWatermark = () => {
  // 显示加载提示，提示用户正在解析
  uni.showLoading({ title: '解析中...' });

  // 模拟API调用延迟
  setTimeout(() => {
    // 隐藏加载提示
    uni.hideLoading();
    // 显示解析完成提示
    uni.showToast({ title: '解析完成', icon: 'success' });
  }, 1500);
};

/**
 * 处理粘贴功能
 * 从剪贴板获取内容并填充到输入框
 */
const handlePaste = async () => {
  try {
    // 从剪贴板获取数据
    const content = await uni.getClipboardData();
    // 将剪贴板数据赋值给视频链接输入框
    videoUrl.value = content.data;
    // 显示粘贴成功提示
    uni.showToast({ title: '粘贴成功' });
  } catch (e) {
    // 显示粘贴失败提示
    uni.showToast({ title: '粘贴失败', icon: 'error' });
  }
};
</script>

<style lang="scss">
/* 主容器样式 */
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f7f7f7;
}

/* 广告横幅区域样式 (保留结构样式) */
.ad-banner {
  position: relative; /* 相对定位 */
  border-radius: 16rpx; /* 圆角 */
  overflow: hidden; /* 溢出隐藏 */
  margin-bottom: 20rpx; /* 底部外边距 */
  height: 120rpx;
  background-color: #dd524d;
  margin-left: 20rpx;
  margin-right: 20rpx;
}

/* 操作区域样式 */
.operation-area {
  background: #fff; /* 背景颜色 */
  border-radius: 16rpx; /* 圆角 */
  padding: 30rpx; /* 内边距 */
  margin-bottom: 30rpx; /* 底部外边距 */

  /* 输入框样式 */
  .input-box {
    margin-bottom: 20rpx; /* 底部外边距 */
    background: #f5f5f5; /* 背景颜色 */
    border-radius: 12rpx; /* 圆角 */
    padding: 20rpx; /* 内边距 */
  }

  /* 操作按钮组样式 */
  .action-buttons {
    display: flex; /* 弹性布局 */
    justify-content: space-between; /* 两端对齐 */

    .action-btn {
      width: 48%; /* 按钮宽度 */
    }
  }
}

/* 功能按钮区样式 */
.feature-buttons {
  background: #fff; /* 背景颜色 */
  border-radius: 16rpx; /* 圆角 */
  padding: 20rpx 0; /* 上下内边距 */

  .nut-grid {
    padding: 0; /* 内边距 */

    /* 网格项样式 */
    .nut-grid-item {
      padding: 20rpx 0; /* 上下内边距 */

      /* 图标样式 */
      image {
        width: 60rpx; /* 宽度 */
        height: 60rpx; /* 高度 */
        margin-bottom: 10rpx; /* 底部外边距 */
      }

      /* 文本样式 */
      text {
        font-size: 24rpx; /* 字体大小 */
        color: #666; /* 字体颜色 */
      }
    }
  }
}

/* 底部声明样式 */
.footer {
  margin-top: 40rpx; /* 顶部外边距 */
  text-align: center; /* 文本居中 */
  font-size: 24rpx; /* 字体大小 */
  color: #999; /* 字体颜色 */
  padding: 20rpx; /* 内边距 */
}
</style>
