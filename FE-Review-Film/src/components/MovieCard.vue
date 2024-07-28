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
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold">{{ movie.title }}</h3>
      <p class="text-gray-600">{{ movie.year }}</p>
    </div>

    <div class="flex gap-2 m-5" v-if="isAdmin">
      <div
        @click.stop="handleDetail(movie.id)"
        class="bg-yellow-400 px-2 py-1 rounded-md shadow-md"
      >
        Detail
      </div>
      <div
        @click.stop="handleEdit(movie.id)"
        class="bg-blue-800 px-2 py-1 rounded-md shadow-md text-white"
      >
        Edit
      </div>
      <div
        @click.stop="handleDelete(movie.id)"
        class="bg-red-500 px-2 py-1 rounded-md shadow-md text-white"
      >
        Hapus
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import MovieService from "@/services/MovieService";
import Functions from "@/tools/Functions";

const props = defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["refresh"]);

const router = useRouter();

const isAdmin = Functions.ReadSessionCustom("isAdmin");

const handleDetail = (id) => {
  MovieService.Detail(id)
    .then(() => {
      router.push("/film/" + id);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleEdit = (id) => {
  router.push("/film/edit/" + id);
};

const handleDelete = (id) => {
  MovieService.Delete(id)
    .then(() => {
      emit("refresh");
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<style scoped>
.card {
  width: 15rem;
}
</style>
