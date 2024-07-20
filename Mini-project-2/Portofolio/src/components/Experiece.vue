<template>
  <div
    class="border border-slate-500 rounded-lg flex p-5 items-center justify-center gap-8 w-80 shadow-md shadow-gray-300"
  >
    <img src="@/assets/images/pac-logo.png" alt="" width="55" />
    <div>
      <h4 class="text-md mb-2 font-bold">{{ list.name }}</h4>
      <div class="text-sm mb-2">
        <a class="underline" href="https://pactindo.com/home/" target="_blank"
          >{{ list.company }}
        </a>
        <div class="flex items-center gap-2">
          <i class="jam jam-circle-f" style="font-size: 5px"></i>
          {{ list.location }}
        </div>
      </div>
      <div class="text-sm">{{ list.date }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Object,
  },
});
</script>
