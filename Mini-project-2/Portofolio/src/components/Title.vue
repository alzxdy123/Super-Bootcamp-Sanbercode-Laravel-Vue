<template>
  <div class="border-bottom-1 pb- md:pb-5 wrapper">
    <h1 class="text-2xl font-bold mb-3 capitalize">{{ title }}</h1>
    <p class="text-lg capitalize">{{ subTitle }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  subTitle: {
    type: String,
  },
});
</script>
