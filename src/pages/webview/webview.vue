<template>
  <web-view :src="url"></web-view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'

const url = ref('')

onLoad((options) => {
  if(options.url) {
    url.value = decodeURIComponent(options.url)
  }
})
</script>
