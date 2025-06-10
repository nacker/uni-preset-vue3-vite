<template>
  <view class="container">
    <!-- 1. 文本显示 -->
    <text class="title">Hello Uniapp!</text>

    <!-- 2. 输入框 -->
    <input 
      v-model="inputText" 
      placeholder="请输入内容" 
      class="input"
    />

    <!-- 3. 按钮 -->
    <button @click="showToast" class="button">点击提示</button>

    <!-- 4. 开关控件 -->
    <switch @change="switchChange" class="switch"/>

    <!-- 5. 进度条 -->
    <progress :percent="progress" show-info class="progress"/>
  </view>
</template>

<script setup>
import { ref } from 'vue'

// 响应式数据
const inputText = ref('')
const progress = ref(30)

// 方法
const showToast = () => {
  uni.showToast({
    title: inputText.value || '你点击了按钮',
    icon: 'none'
  })
}

const switchChange = (e) => {
  console.log('开关状态:', e.detail.value)
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.input {
  border: 1px solid #ddd;
  padding: 8px;
  border-radius: 4px;
}
.button {
  background-color: #007AFF;
  color: white;
}
.switch {
  transform: scale(0.8);
}
.progress {
  margin-top: 10px;
}
</style>