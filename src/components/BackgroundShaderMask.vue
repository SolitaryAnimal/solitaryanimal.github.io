<script setup lang="ts">
import shader from '@/assets/shaders/backgroundMask.glsl?raw'
import SingleShaderCanvas from './utility/SingleShaderCanvas.vue'
</script>

<template>
  <SingleShaderCanvas :shader="shader" />
</template>
