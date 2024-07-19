<template>
  <div>
    <Title title="about" subTitle="story about me"></Title>

    <section class="wrapper" style="max-width: 600px">
      <div class="border-bottom-1 break">
        <p v-for="about in abouts" class="text-base">{{ about }} <br /></p>
      </div>
      <div class="break border-bottom-1">
        <h1 class="font-bold text-2xl mb-7">Im Living In Bandung</h1>
        <p class="text-md">
          Cisaranten Endah, Kec. Arcamanik, Kota Bandung, Jawa Barat, Indonesia
        </p>
      </div>
      <div class="break">
        <h1 class="font-bold text-2xl mb-5">Education</h1>
        <div class="flex gap-5">
          <img src="../assets/images/sb-logo.jpg" width="70" />
          <div>
            <p class="font-bold text-base">SMK SETIA BHAKTI - Bandung</p>
            <div class="text-sm">Rekayasa Perangkat Lunak</div>
            <div class="text-sm">2021 - 2024</div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  </div>
</template>

<script setup>
import Title from "../components/Title.vue";
import Footer from "../components/Footer.vue";
import { useAboutStore } from "../store/about";
import { storeToRefs } from "pinia";

const aboutStore = useAboutStore();
const { abouts } = storeToRefs(aboutStore);
</script>
