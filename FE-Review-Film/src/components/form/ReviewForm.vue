<template>
  <div class="flex w-full justify-center">
    <form
      @submit.prevent="title == 'review' ? handleAdd() : handleUpdate()"
      class="flex flex-col w-80 gap-8 p-10 shadow-lg mt-20"
    >
      <h1 class="text-2xl text-center font-bold capitalize">
        {{ title }}
      </h1>
      <div class="w-full">
        <input
          class="border w-full border-black p-2 rounded-md"
          type="number"
          placeholder="Rating"
          v-model="rating"
          max="5"
        />
      </div>
      <div class="w-full">
        <input
          class="border w-full border-black p-2 rounded-md"
          type="text"
          placeholder="Critic"
          v-model="critic"
        />
      </div>

      <div>
        <button
          type="submit"
          class="px-10 py-2 rounded-md bg-yellow-400 w-full flex justify-center"
        >
          <Icon v-if="isBusy" icon="svg-spinners:180-ring-with-bg" />
          <span v-else>{{ !title == "edit" ? "Tambah" : "Save" }}</span>
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
import GenreService from "@/services/GenreService";
import ReviewService from "@/services/ReviewService";
import Functions from "@/tools/Functions";
import { onMounted, ref } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps({
  movie: Object,
  title: {
    type: String,
    default: "review",
  },
});

const isBusy = ref(false);
const rating = ref("");
const critic = ref("");

const handleAdd = () => {
  isBusy.value = true;

  //   let user = Functions.ReadSessionCustom("user");

  const reqBody = {
    rating: rating.value,
    critic: critic.value,
    movie_id: props.movie,
  };

  ReviewService.Review(reqBody)
    .then((res) => {
      isBusy.value = false;

      window.location.reload();
    })
    .catch((err) => {
      isBusy.value = false;
      console.log(err);
    });
};

const handleUpdate = () => {
  //   isBusy.value = true;
  //   const reqBody = {
  //     id: props.genre.id,
  //     name: name.value,
  //   };
  //   GenreService.Update(reqBody)
  //     .then((res) => {
  //       isBusy.value = false;
  //       window.location.reload();
  //       toast.success(res.data.message);
  //     })
  //     .catch((err) => {
  //       isBusy.value = false;
  //       toast.error(err.response.data.message);
  //       errMessage.value = err.response.data.message;
  //     });
};

onMounted(() => {
  //   if (props.genre) {
  //     name.value = props.genre.name;
  //   }
});
</script>

<style lang="scss" scoped></style>
