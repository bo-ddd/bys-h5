<template>
    <div class="nav-box">
        <div class="nav-header">
            <div class="flex-center">
                <div class="beam"></div>
                <div>{{title}}</div>
            </div>

            <div>
                <slot name="header"></slot>
            </div>
        </div>
        <div class="swiper-box">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
      import { defineProps,toRefs } from "vue";
      let props = defineProps<{
        title:string
      }>();
      let  { title } = toRefs(props);
</script>

<style lang="scss" scoped>
.nav-box {
    .flex-center {
        display: flex;
        align-items: center;
        gap: 0 .6rem;
    }
    .nav-header {
        display: flex;
        font-size: 1.9rem;
        justify-content: space-between;
        .beam {
            width: .4rem;
            background: blue;
            height: 1.9rem;
        }
    }
}
</style>