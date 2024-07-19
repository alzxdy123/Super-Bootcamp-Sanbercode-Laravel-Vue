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
            class="bg-gradient1 capitalize dark:text-transparent dark:bg-clip-text"
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
      <Footer></Footer>
    </section>
  </div>
</template>

<script setup>
import Title from "../components/Title.vue";
import Footer from "../components/Footer.vue";
import Profile from "../components/Profile.vue";
import Experience from "../components/Experiece.vue";
import { useHomeStore } from "../store/home";
import { storeToRefs } from "pinia";

const homeStore = useHomeStore();
const { name, profession, bio, ExperienceLists } = storeToRefs(homeStore);
</script>
