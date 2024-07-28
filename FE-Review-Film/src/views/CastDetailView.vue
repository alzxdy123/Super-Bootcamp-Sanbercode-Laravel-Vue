<template>
  <div class="w-full flex flex-col justify-center">
    <div class="mt-10 w-full flex justify-center">
      <div v-if="isBusy">
        <Icon icon="svg-spinners:180-ring-with-bg" class="text-5xl" />
      </div>

      <div v-if="!isBusy && !errMessage" class="flex flex-col w-full mx-20">
        <div class="text-2xl font-bold text-center mb-10">{{ cast.name }}</div>
        <div class="w-full flex justify-start flex-col">
          <div>
            <div class="text-xl font-bold">Name: {{ cast.name }}</div>
            <div class="text-xl font-bold">Age: {{ cast.age }}</div>
            <div class="text-xl font-bold">Bio: {{ cast.bio }}</div>
          </div>
          <div class="my-20 w-full" v-if="cast.list_movie">
            <p class="text-xl font-bold mb-5">List Movie :</p>
            <div class="flex flex-wrap gap-10 w-full">
              <div
                v-for="movie in cast.list_movie"
                class="flex gap-5 border border-black rounded-lg shadow-md"
              >
                <MovieCard :movie="movie.movie" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <RouterLink to="/cast" class="btn bg-red-400">Back</RouterLink>
    </div>
    <div class="w-full flex justify-center" v-if="errMessage">
      <RouterLink to="/cast" class="btn bg-red-400">Back</RouterLink>
      <p class="text-red-500">{{ errMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import CastService from "@/services/CastService";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { toast } from "vue3-toastify";
import MovieCard from "@/components/MovieCard.vue";

const router = useRoute();
const isBusy = ref(false);
const errMessage = ref("");
const cast = ref({});

const getData = () => {
  isBusy.value = true;

  const id = router.params.id;

  CastService.Detail(id)
    .then((res) => {
      isBusy.value = false;

      cast.value = res.data.data;
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
