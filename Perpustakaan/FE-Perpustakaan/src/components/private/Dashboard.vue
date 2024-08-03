<template>
  <div>
    <Navbar for="owner" />
    <div>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/common/Navbar.vue";
</script>

<style lang="scss" scoped></style>
