<template>
  <div class="flex w-full justify-center">
    <form
      @submit.prevent="title == 'Tambah Cast' ? handleAdd() : handleUpdate()"
      class="flex flex-col w-80 gap-8 p-10 shadow-lg mt-20"
    >
      <h1 class="text-2xl text-center font-bold">{{ title }}</h1>
      <div class="w-full">
        <input
          class="border w-full border-black p-2 rounded-md"
          type="text"
          placeholder="Name"
          v-model="name"
        />
        <p v-if="errMessage" class="text-red-500">{{ errMessage }}</p>
      </div>
      <div class="w-full">
        <input
          class="border w-full border-black p-2 rounded-md"
          type="number"
          placeholder="Age"
          v-model="age"
        />
        <p v-if="errMessage" class="text-red-500">{{ errMessage }}</p>
      </div>
      <div class="w-full">
        <input
          class="border w-full border-black p-2 rounded-md"
          type="text"
          placeholder="Bio"
          v-model="bio"
        />
        <p v-if="errMessage" class="text-red-500">{{ errMessage }}</p>
      </div>

      <div>
        <button
          type="submit"
          class="px-10 py-2 rounded-md bg-yellow-400 w-full flex justify-center"
        >
          <Icon v-if="isBusy" icon="svg-spinners:180-ring-with-bg" />
          <span v-else>{{ title == "Tambah Cast" ? "Tambah" : "Save" }}</span>
        </button>
        <button
          @click="$emit('back')"
          class="px-10 py-2 rounded-md bg-red-500 w-full mt-3 text-white"
        >
          Kembali
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import CastService from "@/services/CastService";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps({
  cast: Object,
  title: {
    type: String,
    default: "Tambah Cast",
  },
});

const isBusy = ref(false);
const name = ref("");
const age = ref("");
const bio = ref("");
const errMessage = ref("");

const handleAdd = () => {
  isBusy.value = true;

  const reqBody = {
    name: name.value,
    age: age.value,
    bio: bio.value,
  };

  CastService.Add(reqBody)
    .then((res) => {
      isBusy.value = false;

      toast.success(res.data.message);
      window.location.reload();
    })
    .catch((err) => {
      isBusy.value = false;
      toast.error(err.response.data.message);
      errMessage.value = err.response.data.message;
    });
};

const handleUpdate = () => {
  isBusy.value = true;

  const reqBody = {
    id: props.cast.id,
    name: name.value,
    age: age.value,
    bio: bio.value,
  };

  CastService.Update(reqBody)
    .then((res) => {
      isBusy.value = false;

      window.location.reload();
      toast.success(res.data.message);
    })
    .catch((err) => {
      isBusy.value = false;
      toast.error(err.response.data.message);
      errMessage.value = err.response.data.message;
    });
};

onMounted(() => {
  if (props.cast) {
    name.value = props.cast.name;
    bio.value = props.cast.bio;
    age.value = props.cast.age;
  }
});
</script>

<style lang="scss" scoped></style>
