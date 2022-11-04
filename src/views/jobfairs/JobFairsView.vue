<template>
  <div class="jobfairs">
    <div class="header">
      <div>招聘会</div>
    </div>

    <div class="main">
      <div class="header-banner">

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.jobfairs {
  height: 100%;

  .header {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 6rem;
    background: #F8F8F8;
    font-size: 1.8rem;
    padding-bottom: 2rem;
  }

  .main {
    height: calc(100% - 8rem);
    overflow: auto;
    background-image: url('@/assets/images/banner.png');
    height: 20rem;
    background-repeat: no-repeat;
    background-size: 100%;
  }
}
</style>
