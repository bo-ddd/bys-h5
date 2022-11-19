<template>
    <div class="drop-menu-wrap">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.drop-menu-wrap{
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
}
</style>