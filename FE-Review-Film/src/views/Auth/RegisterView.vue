<template>
  <div class="flex justify-center items-center w-full h-screen movie-bg">
    <AuthForm :register="true" />
  </div>
</template>

<script setup>
import AuthForm from "@/components/AuthForm.vue";
</script>

<style lang="scss" scoped></style>
