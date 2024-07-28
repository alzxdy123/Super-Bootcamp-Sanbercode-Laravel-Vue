<template>
  <div class="flex w-full justify-center">
    <form
      @submit.prevent="title === 'tambah' ? handleAdd() : handleUpdate()"
      class="flex flex-col w-80 gap-8 p-10 shadow-lg my-20"
    >
      <h1 class="text-2xl text-center font-bold capitalize">
        {{ title }} Movie Cast
      </h1>

      <div>
        <input
          type="text"
          placeholder="Name / Role"
          class="border w-full border-black p-2 rounded-md"
          required
          v-model="name"
        />
      </div>

      <div>
        <label for="movie">Select Movie:</label>
        <select
          id="movie"
          v-model="selectedMovie"
          class="border w-full border-black p-2 rounded-md"
          required
        >
          <option disabled value="">Select a movie</option>
          <option v-for="movie in movies" :key="movie.id" :value="movie.id">
            {{ movie.title }}
          </option>
        </select>
      </div>

      <div>
        <label for="cast">Select Cast:</label>
        <select
          id="cast"
          v-model="selectedCast"
          class="border w-full border-black p-2 rounded-md"
          required
        >
          <option disabled value="">Select a cast</option>
          <option v-for="cast in casts" :key="cast.id" :value="cast.id">
            {{ cast.name }}
          </option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          class="px-10 py-2 rounded-md bg-yellow-400 w-full flex justify-center capitalize"
        >
          <Icon
            v-if="isBusy"
            icon="svg-spinners:180-ring-with-bg"
            class="text-center"
          />
          <span v-else>{{ title === "tambah" ? "Tambah" : "Update" }}</span>
        </button>
        <div
          @click="$emit('back')"
          class="px-10 py-2 rounded-md bg-red-500 w-full mt-3 text-white text-center cursor-pointer"
        >
          Back
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import CastService from "@/services/CastService";
import MovieCastService from "@/services/MovieCastService";
import MovieService from "@/services/MovieService";
import { onMounted, ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "tambah",
  },
  data: Object,
});

const selectedMovie = ref("");
const selectedCast = ref("");
const name = ref("");
const isBusy = ref(false);
const movies = ref(null);
const casts = ref(null);

const getMovie = () => {
  MovieService.GetAll()
    .then((res) => {
      movies.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCast = () => {
  CastService.GetAll()
    .then((res) => {
      casts.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const emit = defineEmits(["back", "refresh"]);

const handleAdd = () => {
  isBusy.value = true;
  const reqBody = {
    name: name.value,
    movie_id: selectedMovie.value,
    cast_id: selectedCast.value,
  };

  MovieCastService.Add(reqBody)
    .then((res) => {
      isBusy.value = false;
      emit("back");
      emit("refresh");
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleUpdate = () => {
  isBusy.value = true;
  const reqBody = {
    name: name.value,
    movie_id: selectedMovie.value,
    cast_id: selectedCast.value,
  };

  MovieCastService.Update(props.data.id, reqBody)
    .then((res) => {
      isBusy.value = false;
      emit("back");
      emit("refresh");
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  console.log(props.data);
  if (props.data) {
    name.value = props.data.name;
    selectedMovie.value = props.data.movie.id;
    selectedCast.value = props.data.cast.id;
  }

  getMovie();
  getCast();
});
</script>

<style lang="scss" scoped></style>
