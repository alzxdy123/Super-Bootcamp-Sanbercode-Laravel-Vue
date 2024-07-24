<template>
  <div>
    <Carousel />
    <div class="flex gap-4 flex-wrap my-20 justify-center">
      <MovieCard v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>
  </div>
</template>

<script setup>
import Carousel from "@/components/Carousel.vue";
import MovieCard from "@/components/MovieCard.vue";

import avengerImage from "@/assets/images/avanger.jpg";
import insideOutImage from "@/assets/images/insideout.jpg";
import interstellarImage from "@/assets/images/interstellar.jpg";
import darkKnightImage from "@/assets/images/dark-knight.jpg";
import inceptionImage from "@/assets/images/inception.jpg";
import frozenImage from "@/assets/images/frozen.jpg";
import laLaLandImage from "@/assets/images/lalaland.jpg";
import jokerImage from "@/assets/images/joker.jpg";
import parasiteImage from "@/assets/images/parasite.jpg";
import blackPantherImage from "@/assets/images/panther.jpg";
import Functions from "@/tools/Functions";
import { onMounted } from "vue";

const movies = [
  {
    image: avengerImage,
    title: "Avenger",
    year: "2012",
    genre: "Action",
  },
  {
    image: insideOutImage,
    title: "Inside Out",
    year: "2015",
    genre: "Animation",
  },
  {
    image: interstellarImage,
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi",
  },
  {
    image: darkKnightImage,
    title: "Dark Knight",
    year: "2008",
    genre: "Action",
  },
  {
    image: inceptionImage,
    title: "Inception",
    year: "2010",
    genre: "Sci-Fi",
  },
  {
    image: frozenImage,
    title: "Frozen",
    year: "2013",
    genre: "Animation",
  },
  {
    image: laLaLandImage,
    title: "La La Land",
    year: "2016",
    genre: "Drama",
  },
  {
    image: jokerImage,
    title: "Joker",
    year: "2019",
    genre: "Thriller",
  },
  {
    image: parasiteImage,
    title: "Parasite",
    year: "2019",
    genre: "Thriller",
  },
  {
    image: blackPantherImage,
    title: "Black Panther",
    year: "2018",
    genre: "Action",
  },
];

// import { useUserStore } from "@/stores/user";

// const userStore = useUserStore();

// onMounted(() => {
//   let user = userStore.currentUser;
//   console.log("🚀 ~ onMounted ~ user:", user);
// });
</script>

<style scoped></style>
