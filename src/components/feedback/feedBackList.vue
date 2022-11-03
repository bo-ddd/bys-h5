<template>
    <div class="main">
        <div class="feed-header">
            <h2><slot name="title"></slot></h2>
        </div>
        <div class="feed-back_list">
            <div class="wrap-list">
              <slot name="item"></slot>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from "vue";

</script>
    
<style lang="scss" scoped>
.feed-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16%;
}
.feed-back_list {
    padding: 0 2rem;
    .wrap-list {
        margin:10% auto;
    }
}
</style>
    