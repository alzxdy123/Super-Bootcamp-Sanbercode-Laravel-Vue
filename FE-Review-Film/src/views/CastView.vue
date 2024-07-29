<template>
  <div class="flex flex-wrap justify-center my-10">
    <CastForm
      v-if="castForm"
      :cast="selectedItem"
      @back="castForm = false"
      title="Edit Cast"
    />
    <CastForm
      v-else-if="CastFormAdd"
      @back="showForm()"
      @click="CastFormAdd = true"
    />
    <div v-else class="w-full flex flex-wrap justify-center flex-col">
      <div class="flex justify-center mt-10">
        <button
          v-if="isAdmin"
          class="btn bg-yellow-400"
          @click="CastFormAdd = true"
        >
          Tambah
        </button>
      </div>
      <div class="w-full flex justify-center flex-wrap mt-10">
        <div v-if="isBusy">
          <Icon icon="svg-spinners:180-ring-with-bg" class="text-5xl" />
        </div>
        <div
          v-else
          v-for="(cast, index) in castMembers"
          :key="index"
          @click="!isAdmin ? handleDetail(cast.id) : ''"
          class="bg-white border border-gray-300 rounded-lg shadow-md p-4 m-2 max-w-xs pl-3 cursor-pointer"
        >
          <h3 class="text-lg font-bold">{{ cast.name }}</h3>
          <p class="my-1"><strong>Age: </strong> {{ cast.age }}</p>
          <p><strong>Bio: </strong>{{ cast.bio.substring(0, 60) }}...</p>
          <div class="flex gap-2 mt-5" v-if="isAdmin">
            <div
              @click="handleDetail(cast.id)"
              class="bg-yellow-400 px-2 py-1 rounded-md shadow-md cursor-pointer"
            >
              Detail
            </div>
            <div
              @click="handleEdit(cast)"
              class="bg-blue-800 px-2 py-1 rounded-md shadow-md cursor-pointer text-white"
            >
              Edit
            </div>
            <div
              @click="handleDelete(cast.id)"
              class="bg-red-500 px-2 py-1 rounded-md shadow-md cursor-pointer text-white"
            >
              Hapus
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CastService from "@/services/CastService";
import CastForm from "@/components/form/CastForm.vue";
import Functions from "@/tools/Functions";
import { onMounted, ref } from "vue";
import router from "@/router";
import { toast } from "vue3-toastify";

// const castMembers = [
//   { name: "Robert Downey Jr." },
//   { name: "Scarlett Johansson" },
//   { name: "Chris Hemsworth" },
//   { name: "Mark Ruffalo" },
//   { name: "Chris Evans" },
//   { name: "Tom Hiddleston" },
//   { name: "Tom Holland" },
//   { name: "Benedict Cumberbatch" },
//   { name: "Elizabeth Olsen" },
//   { name: "Paul Rudd" },
// ];

const castMembers = ref([]);
const isBusy = ref(false);
const castForm = ref(false);
const selectedItem = ref(null);

const getData = () => {
  isBusy.value = true;

  CastService.GetAll()
    .then((res) => {
      isBusy.value = false;

      let data = res.data.data;
      castMembers.value = data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleDetail = (id) => {
  router.push("/cast/" + id);
};

const handleEdit = (cast) => {
  selectedItem.value = cast;
  castForm.value = true;
};

const handleDelete = (id) => {
  isBusy.value = true;

  CastService.Delete(id)
    .then((res) => {
      isBusy.value = false;

      toast.success(res.data.message);
      getData();
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
};

const CastFormAdd = ref(false);

const showForm = () => {
  window.location.reload();
};

const isAdmin = Functions.ReadSessionCustom("isAdmin");

onMounted(() => {
  getData();
});
</script>

<style scoped></style>
