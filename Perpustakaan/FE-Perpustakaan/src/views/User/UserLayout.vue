<template>
  <div>
    <Navbar />
    <div class="container">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import "@/components/Navbar.vue";
</script>

<style lang="scss" scoped></style>
