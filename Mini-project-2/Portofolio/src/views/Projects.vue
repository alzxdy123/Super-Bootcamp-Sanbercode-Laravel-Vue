<template>
  <div>
    <Title title="Projects" subTitle="My Project" />

    <section class="lg:ml-10 wrapper" style="max-width: 700px">
      <div
        class="flex justify-center md:justify-start flex-wrap gap-10 mb-20 w-auto"
      >
        <div
          v-for="project in projects"
          class="w-80 rounded-md h-auto flex flex-col shadow-xl dark:shadow-slate-300 dark:shadow-md"
        >
          <Project :project="project" />
        </div>
      </div>
      <Footer />
    </section>
  </div>
</template>

<script setup>
import Title from "@/components/Title.vue";
import Footer from "@/components/Footer.vue";
import Project from "../components/Project.vue";
import { useProjectStore } from "../store/project";
import { storeToRefs } from "pinia";

const projectStore = useProjectStore();
const { projects } = storeToRefs(projectStore);
</script>
