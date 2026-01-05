<script setup lang="ts">
import steamIcon from '@/assets/icons/icon_platform_steamos.svg'
import Exhibition from './utility/Exhibition.vue'

const props = withDefaults(defineProps<{
  image: string
  title?: string
  describtion?: string
  storeUrl?: string
}>(), {
  title: '',
  describtion: '',
  storeUrl: 'https://store.steampowered.com/',
})
</script>

<template>
  <Exhibition :image="props.image" :title="props.title" :describtion="props.describtion">
    <a class="to-steam" :href="props.storeUrl">
      <img :src="steamIcon" alt="icon">
      <span>在Steam上查看</span>
    </a>
  </Exhibition>
</template>

<style lang="css" scoped>
.to-steam {
  pointer-events: all;

  display: inline-flex;
  align-items: center;
  gap: 0.2em;

  font-size: 1.3rem;
  border-radius: 0.2rem;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  color: #d2efa9;

  background: -webkit-linear-gradient(top, #6fa720 5%, #588a1b 95%);
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.3);
}

.to-steam > img {
  height: 1em;
  width: auto;
  display: inline-block;
}
</style>
