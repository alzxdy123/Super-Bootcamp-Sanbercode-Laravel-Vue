<template>
  <div class="w-full flex justify-center items-center">
    <ReviewForm
      v-if="reviewForm"
      @back="reviewForm = false"
      :movie="selectedMovie"
    />
    <Icon
      v-else-if="isBusy"
      icon="svg-spinners:180-ring-with-bg"
      class="text-5xl text-center mt-10"
    />
    <div
      class="mt-10 flex gap-5 justify-center w-[80%] flex-col"
      v-else-if="movie"
    >
      <div class="flex gap-5 justify-center w-full flex-col md:flex-row">
        <div class="w-1/3">
          <img :src="movie.poster" :alt="movie.title" class="w-full" />
        </div>
        <div>
          <h1 class="text-3xl font-bold mb-5">{{ movie.title }}</h1>
          <p>Summary: {{ movie.summary }}</p>
          <p>Year: {{ movie.year }}</p>
          <p>Genre: {{ movie.genre.name }}</p>
          <div class="flex gap-2">
            <p>Cast:</p>
            <div v-for="cast in movie.list_cast" :key="cast.id">
              {{ cast.name }},
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-bold mt-5">Reviews</h2>
        <div v-if="movie.review.length">
          <div
            v-for="review in movie.review"
            :key="review.id"
            class="mt-3 border p-3 rounded flex gap-3"
          >
            <img
              :src="
                review.user.avatar ||
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              "
              alt="Avatar"
              class="w-10 h-10 rounded-full"
            />
            <div>
              <p class="font-bold">{{ review.user.name }}</p>
              <p class="text-sm text-gray-600 mb-4">{{ review.user.email }}</p>
              <p><strong>Rating:</strong> {{ review.rating }}</p>
              <p><strong>Critic:</strong> {{ review.critic }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No reviews available.</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No movie details available.</p>
    </div>
  </div>
  <div class="w-full flex justify-center my-20 gap-5" v-if="!reviewForm">
    <div @click="handleReview(movie.id)" class="btn bg-yellow-400">Review</div>
    <div @click="$router.go(-1)" class="btn bg-red-500">Back</div>
  </div>
</template>

<script setup>
import MovieService from "@/services/MovieService";
import ReviewForm from "@/components/form/ReviewForm.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();

const movie = ref(null);
const isBusy = ref(false);

const getData = () => {
  isBusy.value = true;
  const id = route.params.id;

  MovieService.Detail(id)
    .then((res) => {
      isBusy.value = false;
      movie.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
      isBusy.value = false;
    });
};

const reviewForm = ref(false);

const selectedMovie = ref("");

const handleReview = (id) => {
  reviewForm.value = true;
  selectedMovie.value = id;
};

onMounted(() => {
  getData();
});
</script>
