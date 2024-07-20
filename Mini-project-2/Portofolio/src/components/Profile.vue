<template>
  <div
    class="flex md:flex-col gap-2 lg:flex-row justify-center items-center"
    :class="{
      'border-b border-gray-400': border,
      'mb-5 lg:pb-11 md:pb-11': padding,
    }"
  >
    <div class="flex gap-5">
      <img class="rounded-full w-12 md:ml-5" :src="Profile" />
      <div>
        <h1 class="font-bold" :class="{ 'hidden lg:block': hidden }">
          {{ name }}
        </h1>
        <p class="text-sm" :class="{ 'hidden lg:block': hidden }">
          {{ noHp }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Profile from "@/assets/images/profile.png";

const name = ref("Aldy Balya Diprana");
const noHp = ref("08996110801");

const props = defineProps({
  hidden: {
    type: Boolean,
  },
  border: {
    type: Boolean,
  },
  padding: {
    type: Boolean,
  },
});
</script>
