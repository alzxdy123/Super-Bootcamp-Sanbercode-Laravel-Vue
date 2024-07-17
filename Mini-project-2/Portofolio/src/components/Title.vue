<template>
  <div
    class="border-b border-gray-300 pb-32 md:pb-5 mr-10 ml-5 lg:ml-10 my-10"
    style="max-height: 93px"
  >
    <h1 class="text-2xl font-bold mb-3 capitalize">{{ title }}</h1>
    <p class="text-lg capitalize">{{ subTitle }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

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
