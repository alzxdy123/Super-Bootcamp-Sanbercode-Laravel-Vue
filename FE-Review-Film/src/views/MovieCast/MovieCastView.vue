<template>
  <MCForm v-if="isAdd" @back="isAdd = false" @refresh="getData()" />
  <MCForm
    v-if="isEdit"
    title="Edit"
    @back="isEdit = false"
    @refresh="getData()"
    :data="selectedData"
  />
  <div v-if="isBusy" class="w-full flex justify-center my-10">
    <Icon icon="svg-spinners:180-ring-with-bg" class="text-5xl" />
  </div>
  <div
    class="w-full flex flex-wrap justify-center gap-5 mt-10"
    v-if="isAdmin && !isAdd && !isEdit && !isBusy"
  >
    <button class="btn bg-yellow-400" @click="isAdd = true">Tambah</button>
  </div>

  <div
    class="w-full flex flex-wrap justify-center gap-5 mt-10"
    v-if="!isAdd && !isBusy && !isEdit"
  >
    <Icon
      icon="svg-spinners:180-ring-with-bg"
      class="text-5xl"
      v-if="!castMovies"
    />
    <div
      v-else
      v-for="data in castMovies"
      :key="data"
      class="p-5 border border-slate-400 shadow-md rounded-md cursor-pointer"
      @click="!isAdmin ? handleDetail(data.id) : ''"
    >
      <h1 class="text-2xl font-bold">{{ data.name }}</h1>
      <p>Play in {{ data.movie.title }} By {{ data.cast.name }}</p>
      <div class="flex gap-2 mt-5" v-if="isAdmin">
        <div
          @click="handleDetail(data.id)"
          class="bg-yellow-400 px-2 py-1 rounded-md shadow-md cursor-pointer"
        >
          Detail
        </div>
        <div
          @click="handleEdit(data)"
          class="bg-blue-800 px-2 py-1 rounded-md shadow-md cursor-pointer text-white"
        >
          Edit
        </div>
        <div
          @click="handleDelete(data.id)"
          class="bg-red-500 px-2 py-1 rounded-md shadow-md cursor-pointer text-white"
        >
          <span>Hapus</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieCastService from "@/services/MovieCastService";
import MCForm from "@/components/form/MCForm.vue";
import Functions from "@/tools/Functions";
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";

const castMovies = ref(null);

const getData = () => {
  MovieCastService.GetAll()
    .then((res) => {
      castMovies.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const isAdd = ref(false);

const isEdit = ref(false);

const isAdmin = Functions.ReadSessionCustom("isAdmin");

import { useRouter } from "vue-router";

const router = useRouter();

const handleDetail = (id) => {
  router.push({ name: "MovieCastDetail", params: { id: id } });
};

const selectedData = ref(null);

const handleEdit = (data) => {
  isEdit.value = true;
  selectedData.value = data;
};

const isBusy = ref(false);

const handleDelete = (id) => {
  isBusy.value = true;
  MovieCastService.Delete(id)
    .then((res) => {
      isBusy.value = false;
      toast.success(res.data.message);
      getData();
    })
    .catch((err) => {
      isBusy.value = false;
      console.log(err);
    });
};

onMounted(() => {
  getData();
});
</script>

<style lang="scss" scoped></style>
