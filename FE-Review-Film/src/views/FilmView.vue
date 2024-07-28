<template>
  <div class="w-full flex justify-center mt-10" v-if="isBusy">
    <Icon icon="svg-spinners:180-ring-with-bg" class="text-center text-5xl" />
  </div>
  <div v-else>
    <div class="w-full flex justify-center flex-col">
      <MovieForm v-if="isAdd" @back="isAdd = false" />
      <MovieForm v-if="isEdit" :movie="selectedItem" />

      <div v-if="!isAdd && !isEdit">
        <div v-if="isAdmin" class="w-full justify-center flex mt-10">
          <button class="btn bg-yellow-400" @click="isAdd = true">
            Tambah
          </button>
        </div>

        <div class="flex gap-4 flex-wrap my-20 justify-center">
          <MovieCard
            v-for="(movie, index) in movieList"
            :key="index"
            :movie="movie"
            @refresh="refresh"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MovieCard from "@/components/MovieCard.vue";
import MovieForm from "@/components/form/MovieForm.vue";
import MovieService from "@/services/MovieService";
import Functions from "@/tools/Functions";
import { toast } from "vue3-toastify";

const movieList = ref([]);
const isBusy = ref(false);
const isAdmin = Functions.ReadSessionCustom("isAdmin");
const isAdd = ref(false);
const isEdit = ref(false);
const selectedItem = ref(null);

const GetData = () => {
  isBusy.value = true;

  MovieService.GetAll()
    .then((res) => {
      isBusy.value = false;
      const data = res.data.data;
      movieList.value = data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const refresh = () => {
  isBusy.value = true;
  toast.success("Hapus Data Berhasil!");
  GetData();
};

onMounted(() => {
  GetData();
});
</script>

<style lang="scss" scoped></style>
