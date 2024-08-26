<template>
  <div>
    <Title
      title="Bank Mandiri KALSEL Ibb Admin"
      :subTitle="$t('ibb-admin.subTitle')"
    />

    <section class="lg:ml-10 wrapper" style="max-width: 700px">
      <h3 class="mb-5">{{ $t("ibb-admin.desc") }}</h3>

      <h3>{{ $t("ibb-admin.summary") }}</h3>

      <h2 class="text-xl font-semibold mt-10 mb-2">
        {{ $t("ibb-admin.feature") }}
      </h2>
      <ul class="list-disc list-inside mb-14">
        <li v-for="item in ibb.items" :key="item">
          {{ item }}
        </li>
      </ul>

      <div class="flex items-center justify-center mb-10 gap-5">
        <i class="jam jam-circle-f text-red-500 text-sm"></i>
        <h3 class="text-1xl font-bold">{{ ibb.alert }}</h3>
      </div>

      <div class="flex flex-col gap-14 m-4">
        <img v-for="image in ibb.images" :key="image" :src="image.img" />
      </div>

      <div class="flex justify-center mt-14">
        <RouterLink
          class="text-slate-900 bg-gradient-to-r from-primary to-secondary text-white py-2 px-6 rounded-md font-bold"
          to="/project"
          >{{ $t("button.back") }}</RouterLink
        >
      </div>
    </section>
    <Footer />
  </div>
</template>

<script setup>
import Title from "@/components/Title.vue";
import Footer from "@/components/Footer.vue";
import { useI18n } from "vue-i18n";
import { ref } from "vue";

import ibb1 from "@/assets/projects/ibb1.png";
import ibb2 from "@/assets/projects/ibb2.png";
import ibb3 from "@/assets/projects/ibb3.png";
import ibb4 from "@/assets/projects/ibb4.png";
import ibb5 from "@/assets/projects/ibb5.png";

const { t } = useI18n();

const ibb = ref({
  items: [
    t("ibb-admin.features.item1"),
    t("ibb-admin.features.item2"),
    t("ibb-admin.features.item3"),
    t("ibb-admin.features.item4"),
    t("ibb-admin.features.item5"),
  ],

  alert: t("ibb-admin.alert"),
  images: [
    {
      img: ibb1,
    },
    {
      img: ibb2,
    },
    {
      img: ibb3,
    },
    {
      img: ibb4,
    },
    {
      img: ibb5,
    },
  ],
});
</script>

<style lang="scss" scoped></style>
