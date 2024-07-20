<template>
  <div>
    <Title title="Home" :subTitle="t('home.subTitle')"></Title>

    <section class="wrapper">
      <div class="flex pl-2 lg:pl-0 gap-3 mb-12 md:hidden">
        <Profile />
      </div>

      <div class="border-bottom-1 break">
        <h1 class="text-3xl font-extrabold">
          {{ t("home.call") }}
          <span
            class="bg-gradient-to-r from-primary to-secondary dark:text-transparent dark:bg-clip-text capitalize"
            >{{ name }}</span
          >
        </h1>
        <p class="my-4 capitalize">{{ profession }}</p>
        <p v-html="t('home.bio')"></p>
      </div>

      <div class="break">
        <h1 class="text-lg font-bold my-4 mb-5">
          <i class="pi pi-briefcase mr-3"></i> {{ t("home.experiences") }}
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
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const name = ref("Aldy");
const profession = ref("fullstack web developer");
const ExperienceLists = reactive([
  {
    name: "Frontend Developer",
    company: "PT. Sarana Pactindo",
    location: "Bandung",
    date: "October 2023 - May 2024",
  },
]);
</script>
