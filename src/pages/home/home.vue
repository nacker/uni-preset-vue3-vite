<template>
  <view class="page-container">
    <!-- 卡片循环列表 -->
    <!--    <view class="custom-card" v-for="item in cardList" :key="item.id" @click="goDetail(item.id)">-->
    <!--      <image :src="item.cover" class="card-bg" mode="aspectFill" />-->
    <!--      <view class="card-content">-->
    <!--        <text class="card-title">{{ item.title }}</text>-->
    <!--        <text class="card-desc">{{ item.desc }}</text>-->
    <!--      </view>-->
    <!--    </view>-->

    <!--    <nut-tab-pane title="加载失败/错误">-->
    <!--      <nut-empty image="error" description="加载失败/错误"></nut-empty>-->
    <!--    </nut-tab-pane>-->
    <!--    <nut-pull-refresh v-model:loading="isLoading" :duration="3" @refresh="onRefresh">-->
    <!--      <div>这里是内容</div>-->
    <!--    </nut-pull-refresh>-->
  </view>
</template>

<script setup>
  const title = ref('Hello World!')

  const cardList = ref([]) // 卡片数据列表
  const isLoading = ref(false)

  // 模拟获取数据
  const fetchCards = () => {
    // 模拟生成数据
    const fakeData = Array.from({ length: 5 }, (_, i) => {
      const id = i + 1
      return {
        id,
        title: `标题 ${id}`,
        desc: '这是描述信息',
        cover: `https://picsum.photos/400/600?random=${id}` // 随机图片
      }
    })

    cardList.value = fakeData
  }

  // 跳转详情页
  // const goDetail = (id) => {
  //   uni.navigateTo({ url: `/pages/card-detail?id=${id}` })
  // }

  // 下拉刷新处理
  const onRefresh = () => {
    setTimeout(() => {
      fetchCards()
      isLoading.value = false
    }, 1000)
  }

  onMounted(() => {
    fetchCards() // 页面加载时获取数据
  })
</script>

<style lang="scss" scoped>
  .page-container {
    padding: 20rpx;
    background: #f5f5f5;
    min-height: 100vh;
  }

  .custom-card {
    position: relative;
    width: 100%;
    height: 220rpx; // 卡片高度
    border-radius: 20rpx;
    overflow: hidden;
    margin-bottom: 20rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
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
