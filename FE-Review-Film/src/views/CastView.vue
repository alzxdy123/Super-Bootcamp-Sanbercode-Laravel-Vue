<template>
  <div class="flex flex-wrap justify-center my-20">
    <div
      v-for="(cast, index) in castMembers"
      :key="index"
      class="bg-white border border-gray-300 rounded-lg shadow-md p-4 m-2 max-w-xs text-center"
    >
      <h3 class="text-lg font-bold">{{ cast.name }}</h3>
    </div>
  </div>
</template>

<script setup>
const castMembers = [
  { name: "Robert Downey Jr." },
  { name: "Scarlett Johansson" },
  { name: "Chris Hemsworth" },
  { name: "Mark Ruffalo" },
  { name: "Chris Evans" },
  { name: "Tom Hiddleston" },
  { name: "Tom Holland" },
  { name: "Benedict Cumberbatch" },
  { name: "Elizabeth Olsen" },
  { name: "Paul Rudd" },
];
</script>

<style scoped>
/* Optional: Add additional styles if needed */
</style>
