<template>
  <div>
    <Title title="skills" subTitle="my programming skills"></Title>
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
            <li v-for="item in skillCategory.items" :key="item">{{ item }}</li>
          </ul>
          <div class="flex gap-4">
            <img
              v-for="logo in skillCategory.logos"
              :src="logo.img"
              alt=""
              width="30"
            />
          </div>
        </div>
      </div>
      <div class="border-bottom-1 break">
        <h1 class="text-2xl font-bold mb-10">Current Favorite Framework</h1>
        <div class="flex gap-5">
          <img
            v-for="framework in frameworks"
            :src="framework.img"
            :alt="framework.name"
            width="70"
          />
        </div>
      </div>
      <div class="break">
        <h1 class="text-2xl font-bold mb-5">Skill</h1>
        <div class="flex gap-5 flex-wrap pb-4">
          <img
            v-for="skill in skillLanguage"
            :src="skill.img"
            :alt="skill.name"
            width="60"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAboutStore } from "../store/about";
import { useSkillStore } from "../store/skill";
import { storeToRefs } from "pinia";
import Title from "../components/Title.vue";

const aboutStore = useAboutStore();
const skillStore = useSkillStore();
const { skillLanguage, frameworks } = storeToRefs(aboutStore);
const { skills } = storeToRefs(skillStore);
</script>
