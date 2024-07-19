<template>
  <div class="fixed bottom-5 flex justify-center w-full md:hidden">
    <div class="flex gap-5 w-auto px-6 py-3 bg-white rounded-3xl shadow-md">
      <RouterLink
        v-for="list in link"
        :to="list.url"
        class="flex justify-center lg:justify-start items-center hover:bg-slate-200 w-10 p-1 rounded-full cursor-pointer hover:scale-110"
        :class="{
          'active-link': $route.path == list.url,
        }"
      >
        <i class="font-extrabold text-xl" :class="list.icon"></i>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const link = ref([
  {
    url: "/",
    icon: "jam jam-home",
  },
  {
    url: "/about",
    icon: "jam jam-user",
  },
  {
    url: "/project",
    icon: "jam jam-layout",
  },
  {
    url: "/skill",
    icon: "pi pi-code",
  },
]);
</script>

<style>
@import "../style.css";
</style>
