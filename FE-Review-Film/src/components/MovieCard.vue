<template>
  <div class="card w-60 bg-white shadow-md rounded-lg overflow-hidden">
    <div class="relative">
      <img
        :src="movie.image"
        alt="movie.title"
        class="w-full h-40 object-cover"
      />
      <span
        class="absolute top-0 left-0 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-br-lg"
        >{{ movie.genre }}</span
      >
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ movie.title }}</h3>
      <p class="text-gray-600">{{ movie.year }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  movie: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.card {
  width: 15rem;
}
</style>
