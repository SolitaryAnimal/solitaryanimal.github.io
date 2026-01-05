<script setup lang="ts">
import shader from '@/assets/shaders/ExhibitionBackground.frag?raw'
import SingleShaderCanvas from './SingleShaderCanvas.vue'

const props = withDefaults(defineProps<{
  image: string
  title?: string
  describtion?: string
}>(), {
  title: '',
  describtion: '',
})
</script>

<template>
  <div class="component-root-exhibition">
    <h1>{{ title }}</h1>
    <div class="card">
      <SingleShaderCanvas class="background" :shader="shader" />
      <div class="shadow" :style="{ backgroundImage: `url(${props.image})` }" />
      <div class="front" :style="{ backgroundImage: `url(${props.image})` }" />
    </div>
    <p>{{ describtion }}</p>
    <slot />
  </div>
</template>

<style lang="css" scoped>
.component-root-exhibition {
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.component-root-exhibition {
  .card {
    width: 16rem;
    height: 24rem;
    position: relative;
    z-index: -1;

    * {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 2rem;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    .shadow {
      width: 105%;
      height: 105%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      filter: blur(30px) brightness(5);
    }

    .background {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 0;

      height: 150%;
      width: auto;
      aspect-ratio: 1 / 1;
    }
  }

  p {
    font-size: 2rem;
  }
}
</style>
