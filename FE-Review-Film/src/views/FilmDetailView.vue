<template>
  <div class="w-full flex justify-center items-center">
    <Icon
      v-if="isBusy"
      icon="svg-spinners:180-ring-with-bg"
      class="text-5xl text-center mt-10"
    />
    <div
      class="mt-10 flex gap-5 justify-center w-[80%] flex-col md:flex-row"
      v-else-if="movie"
    >
      <div class="w-1/3">
        <img :src="movie.poster" :alt="movie.title" class="w-full" />
      </div>
      <div>
        <h1 class="text-3xl font-bold mb-5">{{ movie.title }}</h1>
        <p>Summary: {{ movie.summary }}</p>
        <p>Year: {{ movie.year }}</p>
        <p>Genre: {{ movie.genre.name }}</p>
        <!-- <div class="flex gap-2">
          <p>Cast:</p>
          <p v-for="cast in movie.list_cast" :key="cast.name">
            {{ cast.name }},
          </p>
        </div> -->
      </div>
    </div>
    <div v-else>
      <p>No movie details available.</p>
    </div>
  </div>
  <div class="w-full flex justify-center my-20">
    <RouterLink to="/film" class="btn bg-yellow-400">Back</RouterLink>
  </div>
</template>

<script setup>
import MovieService from "@/services/MovieService";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();

const movie = ref(null);
const isBusy = ref(false);

const getData = () => {
  isBusy.value = true;
  const id = route.params.id;

  MovieService.Detail(id)
    .then((res) => {
      isBusy.value = false;
      console.log("🚀 ~ .then ~ res:", res);
      movie.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
      isBusy.value = false;
    });
};

onMounted(() => {
  getData();
});
</script>
