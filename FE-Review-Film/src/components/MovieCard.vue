<template>
  <div
    class="card w-60 bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
    @click="isAdmin ? '' : handleDetail(movie.id)"
  >
    <div class="relative">
      <img
        :src="movie.poster"
        alt="movie.title"
        class="w-full h-40 object-cover"
      />
      <!-- <span
        class="absolute top-0 left-0 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-br-lg"
        >{{ movie.genre.name }}</span
      > -->
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ movie.title }}</h3>
      <p class="text-gray-600">{{ movie.year }}</p>
    </div>

    <div class="flex gap-2 m-5" v-if="isAdmin">
      <div
        @click="handleDetail(movie.id)"
        class="bg-yellow-400 px-2 py-1 rounded-md shadow-md"
      >
        Detail
      </div>
      <div
        @click="handleEdit(movie.id)"
        class="bg-blue-800 px-2 py-1 rounded-md shadow-md text-white"
      >
        Edit
      </div>
      <div
        @click="handleDelete(movie.id)"
        class="bg-red-500 px-2 py-1 rounded-md shadow-md text-white"
      >
        Hapus
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import MovieService from "@/services/MovieService";
import Functions from "@/tools/Functions";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const isAdmin = Functions.ReadSessionCustom("isAdmin");

const handleDetail = () => {
  const id = props.movie.id;

  MovieService.Detail(id)
    .then((res) => {
      router.push("/film/" + id);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleEdit = (id) => {
  router.push("/film/edit/" + id);
};
</script>

<style scoped>
.card {
  width: 15rem;
}
</style>
