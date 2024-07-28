<template>
  <div>
    <MovieForm title="edit" v-if="movie" :movie="movie" />
    <p v-else>Movie not found.</p>
  </div>
</template>

<script setup>
import MovieForm from "@/components/form/MovieForm.vue";
import MovieService from "@/services/MovieService";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const movie = ref(null);

const getData = () => {
  MovieService.Detail(route.params.id)
    .then((res) => {
      movie.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped></style>
