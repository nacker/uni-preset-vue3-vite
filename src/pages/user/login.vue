<template>
  <view class="login-container">
    <!-- 顶部云朵背景和Logo -->
    <view class="top-bg">
      <image src="/static/cloud-bg.png" class="cloud-bg" mode="widthFix" />
      <view class="logo-area">
        <image src="/static/logo.png" mode="aspectFit" class="logo" />
        <text class="logo-text">优图网</text>
      </view>
    </view>

    <!-- 登录/注册切换 -->
    <view class="tab-bar">
      <text
        class="tab-item"
        :class="{ active: activeTab === 'login' }"
        @click="activeTab = 'login'"
      >登录</text>
      <text
        class="tab-item"
        :class="{ active: activeTab === 'register' }"
        @click="activeTab = 'register'"
      >注册</text>
    </view>

    <!-- 表单区域 -->
    <view class="form-area">
      <view class="input-group">
        <input
          v-model="phoneNumber"
          type="number"
          placeholder="请输入手机号"
          class="input"
          maxlength="11"
        />
      </view>

      <view class="input-group">
        <input
          v-model="verificationCode"
          type="number"
          placeholder="请输入验证码"
          class="input"
          maxlength="6"
        />
        <button
          class="get-code-btn"
          :disabled="countdown > 0"
          @click="getVerificationCode"
        >
          {{ countdown > 0 ? `${countdown}s后重新获取` : '获取验证码' }}
        </button>
      </view>

      <button class="login-btn" @click="handleLogin">登录</button>

      <view class="no-account">
        <text>没有账号？</text>
      </view>
    </view>

    <!-- 协议区域 -->
    <view class="agreement-area">
      <checkbox-group @change="handleAgreementChange">
        <label>
          <checkbox value="agree" :checked="isAgreed" color="#1890FF" />
          <text>我已阅读并同意</text>
          <text class="link" @click="navigateToPrivacyPolicy">《隐私政策》</text>
          <text>和</text>
          <text class="link" @click="navigateToTerms">《用户协议》</text>
        </label>
      </checkbox-group>
    </view>

    <!-- 第三方登录 -->
    <view class="third-login">
      <view class="divider">
        <view class="line"></view>
        <text class="text">或使用以下方式登录</text>
        <view class="line"></view>
      </view>
      <button class="wechat-btn" @click="handleWeChatLogin">
        <image src="/static/wechat-icon.png" class="icon" />
        <text>微信登录</text>
      </button>
    </view>

    <!-- 底部导航点 -->
    <view class="nav-dots">
      <view class="dot green"></view>
      <view class="dot blue"></view>
      <view class="dot red"></view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('login')
const phoneNumber = ref('')
const verificationCode = ref('')
const countdown = ref(0)
const isAgreed = ref(false)

const handleAgreementChange = (e) => {
  isAgreed.value = e.detail.value.includes('agree')
}

const navigateToPrivacyPolicy = () => {
  uni.navigateTo({ url: '/pages/about/privacy' })
}

const navigateToTerms = () => {
  uni.navigateTo({ url: '/pages/about/terms' })
}

const handleWeChatLogin = () => {
  uni.showToast({
    title: '调用微信登录...',
    icon: 'none'
  })
}

const getVerificationCode = () => {
  if (!phoneNumber.value || phoneNumber.value.length !== 11) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }

  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)

  uni.showToast({
    title: '验证码已发送',
    icon: 'none'
  })
}

const handleLogin = () => {
  if (!phoneNumber.value || phoneNumber.value.length !== 11) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }

  if (!verificationCode.value) {
    uni.showToast({
      title: '请输入验证码',
      icon: 'none'
    })
    return
  }

  if (!isAgreed.value) {
    uni.showToast({
      title: '请先同意协议',
      icon: 'none'
    })
    return
  }

  uni.showLoading({ title: '登录中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '登录成功', icon: 'success' })
    uni.reLaunch({ url: '/pages/index/index' })
  }, 1500)
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
}

.top-bg {
  position: relative;
  width: 100%;
  height: 300rpx;

  .cloud-bg {
    width: 100%;
    height: 100%;
  }

  .logo-area {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    .logo {
      width: 120rpx;
      height: 120rpx;
    }

    .logo-text {
      margin-top: 20rpx;
      font-size: 36rpx;
      font-weight: bold;
      color: #fff;
    }
  }
}

.tab-bar {
  display: flex;
  justify-content: center;
  margin: 40rpx 0;

  .tab-item {
    font-size: 32rpx;
    color: #666;
    margin: 0 40rpx;
    padding-bottom: 10rpx;
    position: relative;

    &.active {
      color: #1890FF;
      font-weight: bold;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60rpx;
        height: 4rpx;
        background-color: #1890FF;
      }
    }
  }
}

.form-area {
  padding: 0 60rpx;

  .input-group {
    position: relative;
    margin-bottom: 40rpx;

    .input {
      width: 100%;
      height: 90rpx;
      padding: 0 30rpx;
      background-color: #F7F7F7;
      border-radius: 45rpx;
      font-size: 28rpx;
    }

    .get-code-btn {
      position: absolute;
      right: 20rpx;
      top: 15rpx;
      height: 60rpx;
      line-height: 60rpx;
      padding: 0 20rpx;
      background-color: #1890FF;
      color: #fff;
      font-size: 24rpx;
      border-radius: 30rpx;

      &[disabled] {
        background-color: #CCCCCC;
      }
    }
  }

  .login-btn {
    width: 100%;
    height: 90rpx;
    background-color: #1890FF;
    color: #fff;
    font-size: 32rpx;
    border-radius: 45rpx;
    margin-top: 60rpx;
  }

  .no-account {
    text-align: center;
    margin-top: 30rpx;
    font-size: 24rpx;
    color: #999;
  }
}

.agreement-area {
  padding: 0 60rpx;
  margin-top: 30rpx;
  font-size: 24rpx;
  color: #666;

  .link {
    color: #1890FF;
  }
}

.third-login {
  margin-top: 80rpx;
  padding: 0 60rpx;

  .divider {
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;

    .line {
      flex: 1;
      height: 1rpx;
      background-color: #E5E5E5;
    }

    .text {
      padding: 0 20rpx;
      font-size: 24rpx;
      color: #999;
    }
  }

  .wechat-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90rpx;
    background-color: #07C160;
    color: #fff;
    font-size: 32rpx;
    border-radius: 45rpx;

    .icon {
      width: 40rpx;
      height: 40rpx;
      margin-right: 20rpx;
    }
  }
}

.nav-dots {
  display: flex;
  justify-content: center;
  margin: 60rpx 0 40rpx;

  .dot {
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    margin: 0 10rpx;

    &.green { background-color: #52C41A; }
    &.blue { background-color: #1890FF; }
    &.red { background-color: #F5222D; }
  }
}
</style>
