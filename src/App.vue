<script setup lang="ts"></script>
<template>
  <RouterView v-slot="{Component, route}">
    <keep-alive>
      <component :is="Component" v-if="route.meta.isKeepAlive" />
    </keep-alive>
    <component :is="Component" v-if="!route.meta.isKeepAlive" />
  </RouterView>
</template>

<style scoped>
</style>
