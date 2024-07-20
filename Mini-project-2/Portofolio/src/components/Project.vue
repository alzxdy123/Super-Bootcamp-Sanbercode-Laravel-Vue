<template>
  <a :href="project.url" target="_blank" class="cursor-pointer">
    <div class="bg-slate-400 w-full h-40 rounded-none">
      <img :src="project.img" alt="" style="height: 100%" />
    </div>
    <div class="p-5">
      <div class="flex gap-2 items-center">
        <i class="jam jam-circle-f text-green-300 text-sm"></i>
        <h1 class="font-extrabold text-lg">{{ project.title }}</h1>
      </div>
      <p class="text-sm mt-4">
        {{ project.description }}
      </p>

      <div class="flex gap-5 mt-5">
        <img
          v-for="skill in project.skill"
          :src="skill.img"
          :alt="skill.name"
          width="30"
          alt=""
        />
      </div>
    </div>
  </a>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  project: {
    type: Object,
  },
});
</script>
