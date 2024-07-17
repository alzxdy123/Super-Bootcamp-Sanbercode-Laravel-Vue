<template>
  <div>
    <Title
      title="Home"
      subTitle="Introduction and Professional Career Journey."
    ></Title>

    <section class="wrapper">
      <div class="flex pl-2 lg:pl-0 gap-3 mb-12 md:hidden">
        <Profile />
      </div>

      <div class="border-bottom-1 break">
        <h1 class="text-3xl font-extrabold">
          Call me
          <span
            class="bg-gradient-linear capitalize dark:text-transparent dark:bg-clip-text"
            >{{ name }}</span
          >
        </h1>
        <p class="my-4 capitalize">{{ profession }}</p>
        <p v-html="bio"></p>
      </div>

      <div class="break">
        <h1 class="text-lg font-bold my-4 mb-5">
          <i class="pi pi-briefcase mr-3"></i> Experiences
        </h1>

        <div class="flex flex-wrap gap-5 pb-4">
          <Experience
            v-for="Experiences in ExperienceLists"
            :list="Experiences"
          />
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Title from "../components/Title.vue";
import Footer from "../components/Footer.vue";
import Profile from "../components/Profile.vue";
import Experience from "../components/Experiece.vue";
import { reactive, ref } from "vue";

const name = ref("aldy");
const profession = ref("fullstack web developer");
const bio = ref(
  "Working within Vue Js & Laravel, transform ideas into digital realities that are <br /> easily accessible and inclusive for web users."
);

const ExperienceLists = reactive([
  {
    name: "Frontend Developer",
    company: "PT. Sarana Pactindo",
    location: "Bandung",
    date: "October 2023 - May 2024",
  },
]);
</script>
