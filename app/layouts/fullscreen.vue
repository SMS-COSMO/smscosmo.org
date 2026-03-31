<template>
  <div class="fullscreen-layout">
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.fullscreen-layout {
  width: 100%;
  height: 100%;
  position:fixed;
  top: 0;
  overflow: hidden;
  z-index: 1000;
}
.fullscreen-layout,
.fullscreen-layout > * {
  width: 100%;
  height: 100%;
}
</style>

<style>
html:has(.fullscreen-layout),
body:has(.fullscreen-layout) {
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
}
</style>
