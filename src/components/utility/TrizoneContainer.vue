<script setup lang="ts">
export type TrizonePos = 'left' | 'center' | 'right'
withDefaults(defineProps<{ position?: TrizonePos }>(), {
  position: 'center',
})
</script>

<template>
  <div
    class="component-root-trizone-container"
    :class="`select-position-${position}`"
  >
    <div class="item left">
      <slot name="left" />
    </div>
    <div class="item center">
      <slot name="default" />
    </div>
    <div class="item right">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="css" scoped>
.component-root-trizone-container {
  display: flex;
  justify-content: center;

  .item {
    transition: all 1s;
  }

  &.select-position-center > .center,
  &.select-position-left > .left,
  &.select-position-right > .right {
    flex: 1;
  }
}
</style>
