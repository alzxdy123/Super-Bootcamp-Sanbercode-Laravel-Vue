<template>
  <div>
    <Title
      :title="$t('skills.skill')"
      :subTitle="$t('skills.subTitle')"
    ></Title>
    <div class="wrapper">
      <div class="border-bottom-1 break">
        <div
          v-for="skillCategory in skills"
          :key="skillCategory.category"
          class="mb-6"
        >
          <h2 class="text-xl font-semibold mt-10 mb-2">
            {{ skillCategory.category }}
          </h2>
          <ul class="list-disc list-inside mb-4">
            <li v-for="item in skillCategory.items" :key="item">
              {{ item }}
            </li>
          </ul>
          <div class="flex gap-4">
            <img
              v-for="logo in skillCategory.logos"
              :key="logo.name"
              :src="logo.img"
              :alt="logo.name"
              width="30"
            />
          </div>
        </div>
      </div>
      <div class="border-bottom-1 break">
        <h1 class="text-2xl font-bold mb-10">stack</h1>
        <div class="flex gap-5">
          <img
            v-for="framework in frameworks"
            :key="framework.name"
            :src="framework.img"
            :alt="framework.name"
            width="70"
          />
        </div>
      </div>
      <div class="break">
        <h1 class="text-2xl font-bold mb-5">{{ t("skills.skill") }}</h1>
        <div class="flex gap-5 flex-wrap pb-4">
          <img
            v-for="skill in skillLogo"
            :key="skill.name"
            :src="skill.img"
            :alt="skill.name"
            width="60"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { useSkillStore } from "../store/skill";
import { storeToRefs } from "pinia";
import Title from "../components/Title.vue";
import { useI18n } from "vue-i18n";
import Footer from "../components/Footer.vue";

const skillStore = useSkillStore();
const { skills, skillLogo, frameworks } = storeToRefs(skillStore);
const { t } = useI18n();

console.log(skills);
</script>
