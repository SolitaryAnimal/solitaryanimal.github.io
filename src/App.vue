<script setup lang="ts">
import BackgroundShaderMask from './components/BackgroundShaderMask.vue'
import CardBackground from './components/CardBackground.vue'
import InteractTitle from './components/InteractTitle.vue'

function getImages() {
  // return [imageTest];
  const images = import.meta.glob('/src/assets/imgs/*.{png,jpg,jpeg,svg}', {
    query: { format: 'webp' },
    import: 'default',
    eager: true,
  })
  return Object.keys(images)
}
</script>

<template>
  <div class="root">
    <div class="background">
      <CardBackground
        class="background"
        :angle="45"
        :images="getImages()"
        :card-width="200"
        :card-height="300"
        :card-radius="30"
        :card-column-gap="20"
        :card-row-gap="20"
        :animation-duration="200"
      />
      <!-- <BackgroundShaderMask /> -->
    </div>
    <div class="content">
      <InteractTitle class="title" user-name="SOLITARYANIMAL" />
    </div>
  </div>
</template>

<style scoped>
.root {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}

.root > .background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(13, 13, 13);
}

.background > * {
  width: 100%;
  height: 100%;
  position: absolute;
}

.root > .content {
  position: absolute;
  width: 100%;
  height: 100%;

  pointer-events: none;
}

.title {
  width: 100%;
  height: 100%;
}
</style>
