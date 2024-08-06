<template>
  <div class="public-main">
    <Navbar />
    <RouterView />
  </div>
</template>

<script setup>
import "@/components/common/Navbar.vue";
</script>

<style lang="scss" scoped>
.public-main {
  min-height: 100vh;
  background-color: white;
  padding-bottom: 100px;
  margin-bottom: 0 !important;
}
</style>
