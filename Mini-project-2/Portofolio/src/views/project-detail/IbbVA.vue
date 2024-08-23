<template>
  <div>
    <Title
      title="Bank Mandiri KALSEL Virtual Account"
      :subTitle="$t('ibb-va.subTitle')"
    />

    <section class="lg:ml-10 wrapper" style="max-width: 700px">
      <h3 class="mb-5">{{ $t("ibb-va.desc") }}</h3>
      <h3>{{ $t("ibb-va.summary") }}</h3>

      <h2 class="text-xl font-semibold mt-10 mb-2">
        {{ $t("ibb-va.feature") }}
      </h2>
      <ul class="list-disc list-inside mb-14">
        <li v-for="item in ibb.items" :key="item">
          {{ item }}
        </li>
      </ul>

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
          >Back</RouterLink
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

import va1 from "@/assets/projects/va1.png";
import va2 from "@/assets/projects/va2.png";
import va3 from "@/assets/projects/va3.png";
import va4 from "@/assets/projects/va4.png";

const { t } = useI18n();

const ibb = ref({
  items: [
    t("ibb-va.features.item1"),
    t("ibb-va.features.item2"),
    t("ibb-va.features.item3"),
    t("ibb-va.features.item4"),
    t("ibb-va.features.item5"),
  ],
  outputs: [
    t("ibb-va.outputs.item1"),
    t("ibb-va.outputs.item2"),
    t("ibb-va.outputs.item3"),
    t("ibb-va.outputs.item4"),
    t("ibb-va.outputs.item5"),
  ],
  alert: t("ibb-va.alert"),
  images: [
    {
      img: va1,
    },
    {
      img: va2,
    },
    {
      img: va3,
    },
    {
      img: va4,
    },
  ],
});
</script>

<style lang="scss" scoped></style>
