<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <main>
    <RouterView />
    <Notifications class="notification" />
  </main>
</template>
