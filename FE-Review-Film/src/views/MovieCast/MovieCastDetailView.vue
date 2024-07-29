<template>
  <div>
    <div class="w-full flex justify-center my-10 flex-col" v-if="data">
      <div class="w-full flex justify-center gap-20">
        <h1 class="text-3xl font-bold text-center">{{ data.name }}</h1>
        <RouterLink to="/cast-movie" class="btn bg-yellow-400 w-max"
          >Back</RouterLink
        >
      </div>
      <div class="pl-10 w-full flex flex-col">
        <div>
          <p class="text-xl font-bold">Movie</p>
          <div class="mt-2 flex gap-5 flex-col md:flex-row">
            <div class="w-1/3">
              <img
                :src="data.movie.poster"
                :alt="data.movie.title"
                class="w-full"
              />
            </div>
            <div>
              <h1 class="text-3xl font-bold mb-5">{{ data.movie.title }}</h1>
              <p>Summary: {{ data.movie.summary }}</p>
              <p>Year: {{ data.movie.year }}</p>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <p class="text-xl font-bold">Cast</p>
          <p>{{ data.cast.name }}</p>
        </div>
      </div>
    </div>
    <div v-else class="w-full flex justify-center my-10">
      <Icon icon="svg-spinners:180-ring-with-bg" class="text-5xl text-center" />
    </div>
  </div>
</template>

<script setup>
import MovieCastService from "@/services/MovieCastService";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const router = useRoute();

const data = ref(null);

const getData = () => {
  MovieCastService.Detail(router.params.id)
    .then((res) => {
      console.log(res.data.data);
      data.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const isAdd = ref(false);

const handleAdd = () => {
  isAdd.value = true;
};

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped></style>
