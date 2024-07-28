<template>
  <div>
    <Carousel />
    <div class="flex gap-4 flex-wrap my-20 justify-center">
      <icon
        icon="svg-spinners:180-ring-with-bg"
        class="text-5xl"
        v-if="isBusy"
      />
      <div v-else class="flex gap-4 flex-wrap">
        <MovieCard
          v-for="(movie, index) in movies"
          :key="index"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Carousel from "@/components/Carousel.vue";
import MovieCard from "@/components/MovieCard.vue";
import Functions from "@/tools/Functions";
import { onMounted, ref } from "vue";
import MovieService from "@/services/MovieService";

// const movies = [
//   {
//     poster: avengerImage,
//     title: "Avenger",
//     year: "2012",
//     genre: "Action",
//   },
//   {
//     poster: insideOutImage,
//     title: "Inside Out",
//     year: "2015",
//     genre: "Animation",
//   },
//   {
//     poster: interstellarImage,
//     title: "Interstellar",
//     year: "2014",
//     genre: "Sci-Fi",
//   },
//   {
//     poster: darkKnightImage,
//     title: "Dark Knight",
//     year: "2008",
//     genre: "Action",
//   },
//   {
//     poster: inceptionImage,
//     title: "Inception",
//     year: "2010",
//     genre: "Sci-Fi",
//   },
//   {
//     poster: frozenImage,
//     title: "Frozen",
//     year: "2013",
//     genre: "Animation",
//   },
//   {
//     poster: laLaLandImage,
//     title: "La La Land",
//     year: "2016",
//     genre: "Drama",
//   },
//   {
//     poster: jokerImage,
//     title: "Joker",
//     year: "2019",
//     genre: "Thriller",
//   },
//   {
//     poster: parasiteImage,
//     title: "Parasite",
//     year: "2019",
//     genre: "Thriller",
//   },
//   {
//     poster: blackPantherImage,
//     title: "Black Panther",
//     year: "2018",
//     genre: "Action",
//   },
// ];

const movies = ref(null);
const isBusy = ref(false);

const getMovie = () => {
  isBusy.value = true;
  MovieService.GetAll()
    .then((res) => {
      isBusy.value = false;
      movies.value = res.data.data;
    })
    .catch((err) => {
      isBusy.value = false;
      console.log(err);
    });
};

onMounted(() => {
  getMovie();
});
</script>

<style scoped></style>
