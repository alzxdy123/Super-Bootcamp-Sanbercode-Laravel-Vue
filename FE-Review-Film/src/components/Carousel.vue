<template>
  <div>
    <div class="carousel w-full">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :id="'slide' + (index + 1)"
        class="carousel-item relative w-full"
      >
        <img
          :src="slide.image"
          class="w-full carousel-img"
          :class="slide.objectPosition"
        />
        <div
          class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-20"
        >
          <a
            :href="'#slide' + (index === 0 ? slides.length : index)"
            class="btn btn-circle z-30"
            >❮</a
          >
          <a
            :href="'#slide' + (((index + 1) % slides.length) + 1)"
            class="btn btn-circle z-30"
            >❯</a
          >
        </div>
        <div
          class="absolute inset-0 flex flex-col items-center justify-center z-10 text-center"
        >
          <h2 class="text-white text-4xl font-bold mb-2">{{ slide.title }}</h2>
          <p class="text-white mb-4">{{ slide.description }}</p>
          <div
            class="bg-yellow-400 py-2 cursor-pointer hover:bg-yellow-700 px-8 font-semibold rounded-xl"
          >
            Watch It
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import avanger from "../assets/images/avanger.jpg";
import insideout from "../assets/images/insideout.jpg";
import interstellar from "../assets/images/interstellar.jpg";
import darkknight from "../assets/images/dark-knight.jpg";

const slides = ref([
  {
    image: avanger,
    title: "Avanger",
    description: "An epic movie about superheroes saving the world.",
    objectPosition: "object-top",
  },
  {
    image: insideout,
    title: "Inside Out",
    description: "A heartwarming tale of emotions inside a young girl's mind.",
    objectPosition: "object-center",
  },
  {
    image: interstellar,
    title: "Interstellar",
    description: "A sci-fi adventure through space and time.",
    objectPosition: "",
  },
  {
    image: darkknight,
    title: "Dark Knight",
    description: "A thrilling tale of the caped crusader.",
    objectPosition: "object-top",
  },
]);
</script>

<style scoped>
.carousel-item h2,
.carousel-item p,
.carousel-item button {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
}

.carousel-item button {
  margin-top: 1rem;
}
</style>
