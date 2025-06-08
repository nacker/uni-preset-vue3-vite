<template>
  <!-- 页面容器 -->
  <view class="page-container">
    <!-- 下拉刷新滚动容器
      scroll-y: 启用纵向滚动
      refresher-enabled: 开启自定义下拉刷新
      :refresher-triggered: 绑定下拉状态
      @refresherrefresh: 下拉刷新事件处理 -->
    <scroll-view
      scroll-y
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="handleRefresh"
      class="scroll-content"
    >
      <!-- 卡片列表循环渲染
        v-for: 基于cardList数组生成卡片
        @click: 卡片点击事件跳转详情 -->
      <view
        class="custom-card"
        v-for="item in cardList"
        :key="item.id"
        @click="goDetail(item.id)"
      >
        <!-- 卡片背景图片
          mode="aspectFill": 保持纵横比缩放图片
          :lazy-load="true": 启用图片懒加载 -->
        <image
          :src="item.cover"
          class="card-bg"
          mode="aspectFill"
          :lazy-load="true"
        />
        <!-- 卡片文字内容容器 -->
        <view class="card-content">
          <text class="card-title">{{ item.title }}</text>
          <text class="card-desc">{{ item.desc }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
// 响应式数据声明
const cardList = ref([]) // 卡片数据列表
const isRefreshing = ref(false) // 下拉刷新状态

/**
 * 模拟异步获取卡片数据
 * @returns {Promise} 返回包含测试数据的Promise
 */
const fetchCards = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      // 生成5条测试数据
      const fakeData = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        title: `优化标题 ${i + 1}`,
        desc: '优化后的描述信息',
        cover: `https://picsum.photos/400/600?random=${Date.now()}-${i}`
      }))
      resolve(fakeData)
    }, 500)
  })
}

/**
 * 数据加载统一处理方法
 * 1. 调用获取数据接口
 * 2. 处理异常情况
 */
const loadData = async () => {
  try {
    cardList.value = await fetchCards()
  } catch (error) {
    // 显示错误提示
    uni.showToast({ title: '数据加载失败', icon: 'none' })
  }
}

/**
 * 下拉刷新处理函数
 * 1. 设置刷新状态
 * 2. 重新加载数据
 * 3. 重置刷新状态
 */
const handleRefresh = async () => {
  isRefreshing.value = true
  await loadData()
  isRefreshing.value = false
}

/**
 * 跳转详情页面
 * @param {number} id - 卡片ID
 */
const goDetail = (id) => {
  uni.navigateTo({ url: `/pages/card-detail?id=${id}` })
}

// 组件挂载后自动加载数据
onMounted(async() => {
  await loadData()
})
</script>

<style lang="scss" scoped>
/* 页面容器样式
   min-height: 100vh 保证最小高度为视口高度
   background: 设置页面背景色 */
.page-container {
  background: #f5f5f5;
  min-height: 100vh;
  .scroll-content {
    height: 100%;
  }
}

/* 卡片容器样式
   width: 计算宽度保留边距
   box-shadow: 添加柔和阴影提升层次感 */
.custom-card {
  position: relative;
  width: calc(100% - 40rpx); /* 左右各20rpx边距 */
  height: 220rpx;
  border-radius: 20rpx;
  overflow: hidden;
  margin: 0 20rpx 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  background: #dd524d; /* 备用背景色 */
}

  .card-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .card-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    color: #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .card-title {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 10rpx;
  }

  .card-desc {
    font-size: 28rpx;
    opacity: 0.8;
  }

  ::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 */
  }
</style>
