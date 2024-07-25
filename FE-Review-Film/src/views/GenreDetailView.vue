<template>
  <div class="w-full flex flex-col justify-center">
    <div class="mt-10 w-full flex justify-center">
      <div v-if="isBusy">
        <Icon icon="svg-spinners:180-ring-with-bg" class="text-5xl" />
      </div>

      <div v-if="!isBusy && !errMessage" class="flex flex-col w-1/2">
        <div class="text-2xl font-bold text-center mb-10">{{ genre.name }}</div>
        <div class="w-full flex justify-start flex-col">
          <p class="text-xl font-bold mb-5">List Movie :</p>
          <div class="flex flex-wrap gap-10">
            <div
              v-for="movie in genre.list_movie"
              class="flex gap-5 border border-black rounded-lg shadow-md"
            >
              <div class="w-20">
                <img
                  :src="movie.poster"
                  :alt="movie.title"
                  class="h-full w-full"
                />
              </div>
              <div class="p-5">
                <div>{{ movie.title }}</div>
                <div>{{ movie.summary }}</div>
                <div>{{ movie.year }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RouterLink to="/genre" class="btn bg-red-400">Back</RouterLink>
    </div>
    <div class="w-full flex justify-center" v-if="errMessage">
      <RouterLink to="/genre" class="btn bg-red-400">Back</RouterLink>
      <p class="text-red-500">{{ errMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import GenreService from "@/services/GenreService";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRoute();
const isBusy = ref(false);
const errMessage = ref("");
const genre = ref({});

const getData = () => {
  isBusy.value = true;

  const id = router.params.id;

  GenreService.Detail(id)
    .then((res) => {
      isBusy.value = false;

      genre.value = res.data.data;
      toast.success(res.data.message);
    })
    .catch((err) => {
      isBusy.value = false;
      toast.error(err.response.data.message);
      errMessage.value = err.response.data.message;
    });
};

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped></style>
