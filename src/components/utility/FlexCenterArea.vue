<template>
  <div class="component-root-flex-center-area">
    <slot />
  </div>
</template>

<style lang="css" scoped>
.component-root-flex-center-area {
  display: flex;
  min-height: max-content;
  min-width: max-content;
  justify-content: center;
  align-items: center;
}
</style>
