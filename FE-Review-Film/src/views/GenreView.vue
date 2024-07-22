<template>
  <div class="flex flex-wrap justify-center my-20">
    <div
      v-for="(genre, index) in genres"
      :key="index"
      class="bg-white border border-gray-300 rounded-lg shadow-md p-4 m-2 max-w-xs text-center cursor-pointer"
    >
      <h3 class="text-lg font-bold">{{ genre.name }}</h3>
    </div>
  </div>
</template>

<script setup>
const genres = [
  { name: "Action" },
  { name: "Animation" },
  { name: "Drama" },
  { name: "Thriller" },
  { name: "Sci-Fi" },
  { name: "Comedy" },
  { name: "Horror" },
  { name: "Romance" },
  { name: "Fantasy" },
  { name: "Adventure" },
];
</script>

<style scoped>
/* Optional: Add additional styles if needed */
</style>
