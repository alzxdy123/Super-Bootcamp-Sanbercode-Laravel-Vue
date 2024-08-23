<template>
  <div class="rounded-lg shadow-md overflow-hidden flex flex-col h-full">
    <div class="bg-slate-400 w-full h-40">
      <img
        :src="project.img"
        alt="Project Image"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="p-5 flex-grow">
      <div class="flex gap-2 items-center mb-3">
        <i
          v-if="project.status === 'public'"
          class="jam jam-circle-f text-green-300 text-sm"
        ></i>
        <i v-else class="jam jam-circle-f text-red-500 text-sm"></i>
        <h1 class="font-extrabold text-lg">{{ project.title }}</h1>
      </div>

      <p class="text-sm mb-4">
        {{ project.description }}
      </p>

      <div class="flex gap-4">
        <img
          v-for="skill in project.skill"
          :key="skill.name"
          :src="skill.img"
          :alt="skill.name"
          class="w-8 h-8"
        />
      </div>
    </div>

    <div class="p-5 flex gap-3 justify-center mt-auto">
      <RouterLink
        :to="project.detail"
        v-if="project.detail"
        class="text-slate-900 bg-gradient-to-r from-primary to-secondary text-white py-2 px-6 rounded-md font-bold"
      >
        Detail
      </RouterLink>
      <button
        v-if="project.demo"
        class="text-slate-900 bg-gradient-to-r from-primary to-secondary text-white py-2 px-6 rounded-md font-bold"
      >
        Demo
      </button>
      <a
        v-if="project.postman"
        :href="project.postman"
        target="_blank"
        class="text-slate-900 bg-gradient-to-r from-primary to-secondary text-white py-2 px-6 rounded-md font-bold"
      >
        Dokumentasi
      </a>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";

const { t } = useI18n();

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>
