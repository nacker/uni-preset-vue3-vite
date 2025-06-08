<template>
  <view class="page-container">
    <!-- 添加下拉刷新容器 -->
    <scroll-view
      scroll-y
      refresher-enabled
      :refresher-triggered="isRefreshing"
      @refresherrefresh="handleRefresh"
      class="scroll-content"
    >
      <!-- 优化卡片循环结构 -->
      <view
        class="custom-card"
        v-for="item in cardList"
        :key="item.id"
        @click="goDetail(item.id)"
      >
        <image
          :src="item.cover"
          class="card-bg"
          mode="aspectFill"
          :lazy-load="true"
        />
        <view class="card-content">
          <text class="card-title">{{ item.title }}</text>
          <text class="card-desc">{{ item.desc }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>

  const cardList = ref([])
  const isRefreshing = ref(false)

  // 异步获取数据
  const fetchCards = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
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

  // 统一处理数据加载
  const loadData = async () => {
    try {
      cardList.value = await fetchCards()
    } catch (error) {
      uni.showToast({ title: '数据加载失败', icon: 'none' })
    }
  }

  // 下拉刷新处理
  const handleRefresh = async () => {
    isRefreshing.value = true
    await loadData()
    isRefreshing.value = false
  }

  // 页面跳转
  const goDetail = (id) => {
    uni.navigateTo({ url: `/pages/card-detail?id=${id}` })
  }

  onMounted(async() => {
    await loadData()
  })
</script>

<style lang="scss" scoped>
  .page-container {
    background: #f5f5f5;
    min-height: 100vh;
    .scroll-content {
      height: 100%;
    }
  }

  .custom-card {
    position: relative;
    width: calc(100% - 40rpx); /* 减去左右边距总和 */
    height: 220rpx; // 卡片高度
    border-radius: 20rpx;
    overflow: hidden;
    margin: 0 20rpx 20rpx; /* 上 左右 下 */
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
    background: #dd524d;
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
