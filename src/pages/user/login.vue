<template>
  <view class="login-container">
    <!-- 顶部背景与品牌标识区域 -->
    <view class="top-bg">
      <!-- 云朵背景图，使用widthFix模式保持宽度自适应 -->
      <image src="/static/cloud-bg.png" class="cloud-bg" mode="widthFix" />
      <!-- 品牌Logo与名称容器，居中显示 -->
      <view class="logo-area">
        <!-- 应用Logo，使用aspectFit模式保持宽高比 -->
        <image src="/static/logo.png" mode="aspectFit" class="logo" />
        <!-- 品牌名称，白色粗体字体 -->
        <text class="logo-text">优图网</text>
      </view>
    </view>

    <!-- 登录/注册切换标签 -->
    <view class="tab-bar">
      <!-- 登录标签，active状态时显示蓝色下划线 -->
      <text
        class="tab-item"
        :class="{ active: activeTab === 'login' }"
        @click="activeTab = 'login'"
      >登录</text>
      <!-- 注册标签，active状态时显示蓝色下划线 -->
      <text
        class="tab-item"
        :class="{ active: activeTab === 'register' }"
        @click="activeTab = 'register'"
      >注册</text>
    </view>

    <!-- 表单输入区域 -->
    <view class="form-area">
      <!-- 手机号输入框 -->
      <view class="input-group">
        <input
          v-model="phoneNumber"
          type="number"
          placeholder="请输入11位手机号"
          class="input"
          maxlength="11"
        />
      </view>

      <!-- 验证码输入框（带获取验证码按钮） -->
      <view class="input-group">
        <input
          v-model="verificationCode"
          type="number"
          placeholder="请输入6位验证码"
          class="input"
          maxlength="6"
        />
        <!-- 获取验证码按钮，禁用状态时显示灰色 -->
        <button
          class="get-code-btn"
          :disabled="countdown > 0"
          @click="getVerificationCode"
        >
          {{ countdown > 0 ? `${countdown}s后重新获取` : '获取验证码' }}
        </button>
      </view>

      <!-- 登录主按钮，点击触发登录逻辑 -->
      <button class="login-btn" @click="handleLogin">登录</button>

      <!-- 无账号提示 -->
      <view class="no-account">
        <text>没有账号？</text>
      </view>
    </view>

    <!-- 用户协议勾选区域 -->
    <view class="agreement-area">
      <checkbox-group @change="handleAgreementChange">
        <label>
          <!-- 协议勾选框，蓝色选中状态 -->
          <checkbox value="agree" :checked="isAgreed" color="#1890FF" />
          <text>我已阅读并同意</text>
          <!-- 隐私政策链接，点击跳转隐私政策页面 -->
          <text class="link" @click="navigateToPrivacyPolicy">《隐私政策》</text>
          <text>和</text>
          <!-- 用户协议链接，点击跳转用户协议页面 -->
          <text class="link" @click="navigateToTerms">《用户协议》</text>
        </label>
      </checkbox-group>
    </view>

    <!-- 第三方登录区域 -->
    <view class="third-login">
      <!-- 分割线与提示文本 -->
      <view class="divider">
        <view class="line"></view>
        <text class="text">或使用以下方式登录</text>
        <view class="line"></view>
      </view>
      <!-- 微信登录按钮，绿色背景带图标 -->
      <button class="wechat-btn" @click="handleWeChatLogin">
        <image src="/static/wechat-icon.png" class="icon" />
        <text>微信登录</text>
      </button>
    </view>


  </view>
</template>

<script setup>
import { ref } from 'vue'

// 响应式变量：当前激活的标签（登录/注册）
const activeTab = ref('login')
// 响应式变量：用户输入的手机号
const phoneNumber = ref('')
// 响应式变量：用户输入的验证码
const verificationCode = ref('')
// 响应式变量：验证码倒计时（秒）
const countdown = ref(0)
// 响应式变量：是否同意用户协议
const isAgreed = ref(false)

/**
 * 处理协议勾选状态变化
 * @param {Object} e - 勾选事件对象
 */
const handleAgreementChange = (e) => {
  isAgreed.value = e.detail.value.includes('agree')
}

/**
 * 跳转到隐私政策页面
 */
const navigateToPrivacyPolicy = () => {
  uni.navigateTo({ url: '/pages/about/privacy' })
}

/**
 * 跳转到用户协议页面
 */
const navigateToTerms = () => {
  uni.navigateTo({ url: '/pages/about/terms' })
}

/**
 * 处理微信登录点击事件
 */
const handleWeChatLogin = () => {
  uni.showToast({ title: '调用微信登录...', icon: 'none' })
}

/**
 * 获取验证码逻辑
 * 1. 校验手机号格式
 * 2. 启动倒计时
 * 3. 模拟验证码发送提示
 */
const getVerificationCode = () => {
  if (!phoneNumber.value || phoneNumber.value.length !== 11) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }

  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) clearInterval(timer)
  }, 1000)

  uni.showToast({ title: '验证码已发送', icon: 'none' })
}

/**
 * 处理登录逻辑
 * 1. 校验手机号格式
 * 2. 校验验证码是否输入
 * 3. 校验是否同意协议
 * 4. 模拟登录请求
 */
const handleLogin = () => {
  if (!phoneNumber.value || phoneNumber.value.length !== 11) {
    uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
    return
  }

  if (!verificationCode.value) {
    uni.showToast({ title: '请输入验证码', icon: 'none' })
    return
  }

  if (!isAgreed.value) {
    uni.showToast({ title: '请先同意协议', icon: 'none' })
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
// 登录页面整体容器样式
.login-container {
  display: flex;
  flex-direction: column;
  height: 100vh; // 修改：将min-height改为固定高度100vh，确保容器占满视口
  background-color: #f8f9fa; // 浅灰色背景提升质感
}

// 顶部背景区域样式
.top-bg {
  position: relative;
  width: 100%;
  height: 300rpx;

  .cloud-bg {
    width: 100%;
    height: 100%;
    opacity: 0.9; // 背景图半透明处理
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
      width: 140rpx;
      height: 140rpx;
      border-radius: 20rpx; // 添加Logo圆角
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1); // 阴影提升层次感
    }

    .logo-text {
      margin-top: 20rpx;
      font-size: 40rpx;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.2); // 文字阴影增强可读性
    }
  }
}

// 标签切换栏样式
.tab-bar {
  display: flex;
  justify-content: center;
  margin: 60rpx 0 40rpx;

  .tab-item {
    font-size: 36rpx;
    color: #666;
    margin: 0 60rpx;
    padding-bottom: 12rpx;
    position: relative;
    transition: color 0.3s;

    &.active {
      color: #1890FF;
      font-weight: 600;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80rpx;
        height: 4rpx;
        background-color: #1890FF;
        border-radius: 2rpx;
      }
    }
  }
}

// 表单区域样式
.form-area {
  padding: 0 60rpx;

  .input-group {
    position: relative;
    margin-bottom: 40rpx;

    .input {
      width: 100%;
      height: 100rpx;
      padding: 0 40rpx;
      background-color: #ffffff;
      border-radius: 50rpx;
      font-size: 30rpx;
      border: 2rpx solid #e9ecef;
      transition: border-color 0.3s;
      box-sizing: border-box; // 关键修改：设置盒模型为border-box，包含内边距和边框

      &:focus {
        border-color: #1890FF;
      }
    }

    .get-code-btn {
      position: absolute;
      right: 20rpx;
      top: 20rpx;
      height: 60rpx;
      line-height: 60rpx;
      padding: 0 30rpx;
      background-color: #1890FF;
      color: #fff;
      font-size: 28rpx;
      border-radius: 30rpx;
      transition: opacity 0.3s;

      &[disabled] {
        background-color: #dee2e6;
        color: #666;
      }
    }
  }

  .login-btn {
    width: 100%;
    height: 100rpx;
    background-color: #1890FF;
    color: #fff;
    font-size: 34rpx;
    border-radius: 50rpx;
    margin-top: 60rpx;
    box-shadow: 0 4rpx 16rpx rgba(24, 144, 255, 0.2); // 按钮阴影
    transition: transform 0.3s;

    &:active {
      transform: scale(0.98); // 点击时轻微缩小
    }
  }

  .no-account {
    text-align: center;
    margin-top: 30rpx;
    font-size: 28rpx;
    color: #999;
  }
}

// 协议区域样式
.agreement-area {
  padding: 0 60rpx;
  margin-top: 40rpx;
  font-size: 28rpx;
  color: #666;

  .link {
    color: #1890FF;
    text-decoration: underline;
    transition: color 0.3s;

    &:hover {
      color: #136ac6;
    }
  }
}

// 第三方登录区域样式
.third-login {
  margin-bottom: 30rpx;
  padding: 0 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center; // 新增：使子元素水平居中

  .divider {
    display: flex;
    align-items: center;
    margin-bottom: 50rpx;

    .line {
      flex: 1;
      height: 2rpx;
      background-color: #e9ecef;
    }

    .text {
      padding: 0 30rpx;
      font-size: 28rpx;
      color: #999;
    }
  }

  .wechat-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100rpx; // 修改：固定宽度为100rpx
    height: 100rpx; // 修改：高度与宽度一致
    background-color: #07C160;
    color: #fff;
    font-size: 28rpx; // 调整字体大小适配圆形
    border-radius: 50%; // 修改：圆形按钮
    box-shadow: 0 4rpx 16rpx rgba(7, 193, 96, 0.2);
    transition: transform 0.3s;
    margin-bottom: 30rpx; // 新增：底部距离30rpx

    .icon {
      width: 48rpx;
      height: 48rpx;
      margin-right: 0; // 移除右侧边距，因按钮已居中
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>
