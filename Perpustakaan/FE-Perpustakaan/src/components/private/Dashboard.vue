<template>
  <div class="dashboard">
    <Navbar for="owner" />
    <div>
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/common/Navbar.vue";
</script>

<style lang="scss" scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f2f2f2;
  padding-bottom: 100px;
  margin-bottom: 0 !important;
}
</style>
