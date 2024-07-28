<template>
  <div class="w-full flex justify-center flex-col">
    <MovieForm v-if="isAdd" @back="isAdd = false" />
    <MovieForm v-if="isEdit" :movie="selectedItem" />

    <div v-if="!isAdd && !isEdit">
      <div v-if="isAdmin" class="w-full justify-center flex mt-10">
        <button class="btn bg-yellow-400" @click="isAdd = true">Tambah</button>
      </div>

      <div class="flex gap-4 flex-wrap my-20 justify-center">
        <MovieCard
          v-for="(movie, index) in movie"
          :key="index"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieCard from "@/components/MovieCard.vue";
import MovieForm from "@/components/form/MovieForm.vue";

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
import { onMounted, ref } from "vue";
import MovieService from "@/services/MovieService";
import Functions from "@/tools/Functions";

const movies = [
  {
    poster: avengerImage,
    title: "Avenger",
    year: "2012",
    genre: "Action",
  },
  {
    poster: insideOutImage,
    title: "Inside Out",
    year: "2015",
    genre: "Animation",
  },
  {
    poster: interstellarImage,
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi",
  },
  {
    poster: darkKnightImage,
    title: "Dark Knight",
    year: "2008",
    genre: "Action",
  },
  {
    poster: inceptionImage,
    title: "Inception",
    year: "2010",
    genre: "Sci-Fi",
  },
  {
    poster: frozenImage,
    title: "Frozen",
    year: "2013",
    genre: "Animation",
  },
  {
    poster: laLaLandImage,
    title: "La La Land",
    year: "2016",
    genre: "Drama",
  },
  {
    poster: jokerImage,
    title: "Joker",
    year: "2019",
    genre: "Thriller",
  },
  {
    poster: parasiteImage,
    title: "Parasite",
    year: "2019",
    genre: "Thriller",
  },
  {
    poster: blackPantherImage,
    title: "Black Panther",
    year: "2018",
    genre: "Action",
  },
];

const movie = ref(null);
const isBusy = ref(false);
const isAdmin = Functions.ReadSessionCustom("isAdmin");
const isAdd = ref(false);
const isEdit = ref(false);
const selectedItem = ref(null);

const GetData = () => {
  isBusy.value = true;

  MovieService.GetAll()
    .then((res) => {
      const data = res.data.data;

      movie.value = data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  GetData();
});
</script>

<style lang="scss" scoped></style>
