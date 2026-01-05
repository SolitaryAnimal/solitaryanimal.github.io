<script setup lang="ts">
import shader from '@/assets/shaders/test.glsl?raw'
import SingleShaderCanvas from './SingleShaderCanvas.vue'
</script>

<template>
  <SingleShaderCanvas :shader="shader" />
</template>
