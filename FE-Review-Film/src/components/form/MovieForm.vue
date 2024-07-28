<template>
  <div class="flex w-full justify-center">
    <form
      @submit.prevent="handleAdd"
      class="flex flex-col w-80 gap-8 p-10 shadow-lg my-10"
    >
      <h1 class="font-bold text-2xl capitalize text-center">
        {{ title }} Movie
      </h1>
      <div>
        <input
          class="border w-full border-black p-2 rounded-md"
          type="text"
          v-model="formData.title"
          id="title"
          required
          placeholder="Title"
        />
      </div>

      <div>
        <textarea
          class="border w-full border-black p-2 rounded-md"
          v-model="formData.summary"
          id="summary"
          placeholder="Summary"
          required
        ></textarea>
      </div>

      <div>
        <input
          class="border w-full border-black p-2 rounded-md"
          type="date"
          v-model="formData.year"
          placeholder="Year"
          id="year"
          required
        />
      </div>

      <div>
        <label for="poster">Poster:</label>
        <input
          class="border w-full border-black p-2 rounded-md"
          type="file"
          @change="handleFileUpload"
          id="poster"
          accept="image/*"
        />
      </div>

      <div>
        <select
          v-model="formData.genre_id"
          id="genre_id"
          required
          class="border w-full border-black p-2 rounded-md"
        >
          <option disabled value="">Select Genre</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </div>

      <div>
        <label>Cast:</label>
        <div v-for="(cast, index) in casts" :key="cast.id">
          <input type="checkbox" :value="cast.id" v-model="selectedCasts" />
          {{ cast.name }}
          <input
            v-if="selectedCasts.includes(cast.id)"
            type="text"
            v-model="formData.roles[cast.id]"
            placeholder="Role Name"
            class="border w-full border-black p-2 rounded-md mt-2"
          />
        </div>
      </div>

      <div class="w-full">
        <button
          type="submit"
          class="px-10 py-2 rounded-md bg-yellow-400 w-full flex justify-center capitalize"
        >
          {{ title == "tambah" ? "tambah" : "simpan" }}
        </button>
        <RouterLink
          to="/film"
          class="px-10 py-2 rounded-md bg-red-500 w-full mt-3 text-white flex justify-center"
          @click="$emit('back')"
        >
          Back
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import GenreService from "@/services/GenreService";
import CastService from "@/services/CastService";
import axios from "axios";
import { onMounted, ref, reactive } from "vue";
import MovieService from "@/services/MovieService";

// Define the props
const props = defineProps({
  title: {
    type: String,
    default: "tambah",
  },
  movie: {
    type: Object,
    default: () => ({}),
  },
});

// Reactive form data
const formData = reactive({
  title: "",
  summary: "",
  year: "",
  poster: null,
  genre_id: "",
  roles: {},
});

const selectedCasts = ref([]);

// Ref for genres and casts
const genres = ref([]);
const casts = ref([]);

// Function to get genres
const getGenre = () => {
  GenreService.GetAll()
    .then((res) => {
      genres.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Function to get casts
const getCasts = () => {
  CastService.GetAll()
    .then((res) => {
      casts.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Function to handle form submission
const handleAdd = async () => {
  const formDataToSend = new FormData();
  formDataToSend.append("title", formData.title);
  formDataToSend.append("summary", formData.summary);
  formDataToSend.append("year", formData.year);
  formDataToSend.append("genre_id", formData.genre_id);
  if (formData.poster) {
    formDataToSend.append("poster", formData.poster);
  }
  selectedCasts.value.forEach((castId) => {
    formDataToSend.append("cast_ids[]", castId);
    formDataToSend.append(`roles[${castId}]`, formData.roles[castId]);
  });

  MovieService.Add(formDataToSend)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Function to handle file upload
const handleFileUpload = (event) => {
  formData.poster = event.target.files[0];
};

// Function to format date to yyyy-MM-dd
const formatDateToInput = (dateString) => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("-");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// onMounted hook to initialize form data and get genres and casts
onMounted(() => {
  if (props.movie) {
    formData.title = props.movie.title;
    formData.summary = props.movie.summary;
    formData.year = formatDateToInput(props.movie.year);
    formData.poster = props.movie.poster;
    formData.genre_id = props.movie.genre_id;
    selectedCasts.value = props.movie.cast_ids || [];
    formData.roles = props.movie.roles || {};
  }
  getGenre();
  getCasts();
});
</script>

<style lang="scss" scoped></style>

<!-- <template>
  <div class="flex w-full justify-center">
    <form
      @submit.prevent="handleAdd"
      class="flex flex-col w-80 gap-8 p-10 shadow-lg my-10"
    >
      <h1 class="font-bold text-2xl capitalize text-center">
        {{ title }} Movie
      </h1>
      <div>
        <input
          class="border w-full border-black p-2 rounded-md"
          type="text"
          v-model="formData.title"
          id="title"
          required
          placeholder="Title"
        />
      </div>

      <div>
        <textarea
          class="border w-full border-black p-2 rounded-md"
          v-model="formData.summary"
          id="summary"
          placeholder="Summary"
          required
        ></textarea>
      </div>

      <div>
        <input
          class="border w-full border-black p-2 rounded-md"
          type="date"
          v-model="formData.year"
          placeholder="Year"
          id="year"
          required
        />
      </div>

      <div>
        <label for="poster">Poster:</label>
        <input
          class="border w-full border-black p-2 rounded-md"
          type="file"
          @change="handleFileUpload"
          id="poster"
          accept="image/*"
        />
      </div>

      <div>
        <select
          v-model="formData.genre_id"
          id="genre_id"
          required
          class="border w-full border-black p-2 rounded-md"
        >
          <option disabled value="">Select Genre</option>
          <option v-for="genre in genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
      </div>

      <div class="w-full">
        <button
          type="submit"
          class="px-10 py-2 rounded-md bg-yellow-400 w-full flex justify-center capitalize"
        >
          {{ title == "tambah" ? "tambah" : "simpan" }}
        </button>
        <RouterLink
          to="/film"
          class="px-10 py-2 rounded-md bg-red-500 w-full mt-3 text-white flex justify-center"
          @click="$emit('back')"
        >
          Back
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup>
import GenreService from "@/services/GenreService";
import { onMounted, ref, reactive } from "vue";

// Define the props
const props = defineProps({
  title: {
    type: String,
    default: "tambah",
  },
  movie: {
    type: Object,
    default: () => ({}),
  },
});

// Reactive form data
const formData = reactive({
  title: "",
  summary: "",
  year: "",
  poster: null,
  genre_id: "",
});

// Ref for genres
const genres = ref([]);

// Function to get genres
const getGenre = () => {
  GenreService.GetAll()
    .then((res) => {
      genres.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Function to handle form submission
const handleAdd = () => {
  // Add or update movie logic here
};

// Function to handle file upload
const handleFileUpload = (event) => {
  formData.poster = event.target.files[0];
};

// Function to format date to yyyy-MM-dd
const formatDateToInput = (dateString) => {
  if (!dateString) return "";
  const [day, month, year] = dateString.split("-");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// onMounted hook to initialize form data and get genres
onMounted(() => {
  if (props.movie) {
    formData.title = props.movie.title;
    formData.summary = props.movie.summary;
    formData.year = formatDateToInput(props.movie.year);
    formData.poster = props.movie.poster;
    formData.genre_id = props.movie.genre_id;
  }
  getGenre();
});
</script>

<style lang="scss" scoped></style> -->
