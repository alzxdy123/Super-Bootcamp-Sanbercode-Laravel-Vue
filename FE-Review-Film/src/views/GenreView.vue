<template>
  <div class="w-full flex justify-center flex-col">
    <GenreForm v-if="genreForm" @back="genreForm = false" />
    <GenreForm
      v-else-if="genreUpdateForm"
      @back="genreUpdateForm = false"
      title="Edit Genre"
      :genre="selectedItem"
    />
    <div v-else class="w-full flex flex-wrap justify-center flex-col">
      <div class="flex justify-center mt-10">
        <button
          v-if="isAdmin"
          class="btn bg-yellow-400"
          @click="genreForm = true"
        >
          Tambah
        </button>
      </div>
      <div class="flex flex-wrap justify-center my-10">
        <Icon
          v-if="isBusy"
          icon="svg-spinners:180-ring-with-bg"
          class="text-5xl"
        />
        <div
          v-else
          v-for="(genre, index) in genres"
          :key="genre.id"
          @click="!isAdmin ? handleDetail(genre.id) : ''"
          class="bg-white border border-gray-300 rounded-lg shadow-md p-4 m-2 max-w-xs text-center cursor-pointer"
        >
          <h3 class="text-lg font-bold">{{ genre.name }}</h3>
          <div class="flex gap-2 mt-5" v-if="isAdmin">
            <div
              @click="handleDetail(genre.id)"
              class="bg-yellow-400 px-2 py-1 rounded-md shadow-md"
            >
              Detail
            </div>
            <div
              @click="handleEdit(genre)"
              class="bg-blue-800 px-2 py-1 rounded-md shadow-md text-white"
            >
              Edit
            </div>
            <div
              @click="handleDelete(genre.id)"
              class="bg-red-500 px-2 py-1 rounded-md shadow-md text-white"
            >
              Hapus
            </div>
          </div>
        </div>
        <div>{{ errMessage }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import GenreService from "@/services/GenreService";
import GenreForm from "@/components/form/GenreForm.vue";
import Functions from "@/tools/Functions";
import { onMounted, ref } from "vue";
import router from "@/router";
import { toast } from "vue3-toastify";

const isBusy = ref(false);
const errMessage = ref("");
const genres = ref({});
const genreForm = ref(false);
const genreUpdateForm = ref(false);
const selectedItem = ref({});

const getGenre = () => {
  isBusy.value = true;

  GenreService.GetAll()
    .then((res) => {
      isBusy.value = false;
      let data = res.data.data;

      genres.value = data;
    })
    .catch((err) => {
      isBusy.value = false;
      errMessage.value = err.response.data.message;
    });
};

const handleDetail = (id) => {
  router.push("/genre/" + id);
};

const handleEdit = (genre) => {
  selectedItem.value = genre;
  genreUpdateForm.value = true;
};

const handleDelete = (id) => {
  isBusy.value = true;

  GenreService.Delete(id)
    .then((res) => {
      isBusy.value = false;

      toast.success(res.data.message);
      getGenre();
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

const isAdmin = ref(false);

onMounted(() => {
  let admin = Functions.ReadSessionCustom("isAdmin");
  isAdmin.value = admin;
  getGenre();
});
</script>

<style scoped>
/* Optional: Add additional styles if needed */
</style>
