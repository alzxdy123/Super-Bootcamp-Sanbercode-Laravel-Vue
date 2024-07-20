<template>
  <div>
    <Title :title="t('about.title')" :subTitle="t('about.subTitle')"></Title>

    <section class="wrapper" style="max-width: 600px">
      <div class="border-bottom-1 break">
        <!-- Render HTML content with v-html -->
        <p v-for="(about, index) in abouts" :key="index" class="text-base">
          {{ about.text }} <br />
          <br />
        </p>
      </div>
      <div class="break border-bottom-1">
        <h1 class="font-bold text-2xl mb-7">
          {{ t("about.address") }}
          <span
            class="bg-gradient-to-r from-primary to-secondary dark:text-transparent dark:bg-clip-text"
            >Bandung</span
          >
        </h1>
        <p class="text-md">
          Cisaranten Endah, Kec. Arcamanik, Kota Bandung, Jawa Barat, Indonesia
        </p>
      </div>
      <div class="break">
        <h1 class="font-bold text-2xl mb-5">{{ t("about.education") }}</h1>
        <div class="flex gap-5">
          <img src="../assets/images/sb-logo.png" width="70" />
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
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const { t } = useI18n();

const abouts = ref([
  { text: t("about.text1") },
  { text: t("about.text2") },
  { text: t("about.text3") },
]);
</script>

<style scoped>
/* Add your styles here */
</style>
