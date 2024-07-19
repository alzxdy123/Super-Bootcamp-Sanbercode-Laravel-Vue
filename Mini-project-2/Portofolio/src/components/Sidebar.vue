<template>
  <div class="wrapper hidden md:block">
    <Profile :hidden="true" :border="true" :padding="true" />

    <div class="border-bottom-1">
      <RouterLink
        v-for="list in NavLists"
        :to="list.path"
        class="flex justify-center lg:justify-start items-center gap-3 p-3 mb-5 rounded-md cursor-pointer hover:scale-110 hover:bg-slate-200 lg:w-auto lg:mr-auto hover:dark:bg-slate-950"
        :class="{
          'active-link': $route.path == list.path,
        }"
      >
        <i :class="list.icon + ' font-extrabold text-xl mb-1'"></i>
        <h1 class="text-md font-bold hidden lg:block">{{ list.name }}</h1>
      </RouterLink>
    </div>

    <!-- <div class="w-full">
      <h1 class="font-bold my-4">Theme</h1>
      <div
        class="w-full flex flex-wrap gap-3 justify-start border-b border-slate-400 pb-8"
      >
        <button
          @click="toggleDarkMode(false)"
          class="text-sm font-bold p-3 rounded-md text-black bg-gradient1 dark:text-white dark:bg-none"
        >
          Light
        </button>
        <button
          @click="toggleDarkMode(true)"
          class="text-sm font-bold p-3 rounded-md dark dark:bg-gradient1 dark:text-black"
        >
          Dark
        </button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import Profile from "@/components/Profile.vue";
import { ref, reactive, onMounted } from "vue";

const NavLists = reactive([
  {
    name: "Home",
    path: "/",
    icon: " jam jam-home",
  },
  {
    name: "About",
    path: "/about",
    icon: " jam jam-user",
  },
  {
    name: "Project",
    path: "/project",
    icon: "jam jam-layout",
  },
  {
    name: "Skill",
    path: "/skill",
    icon: "pi pi-code",
  },
]);

const isDarkMode = ref(false);

const toggleDarkMode = (params) => {
  isDarkMode.value = params;
  localStorage.setItem("darkMode", isDarkMode.value);
  window.location.reload();

  getTheme();
};

const getTheme = () => {
  let darkMode = localStorage.getItem("darkMode");

  if (darkMode == "true") {
    isDarkMode.value = true;
    document.documentElement.classList.add("dark");
  } else {
    isDarkMode.value = false;
    document.documentElement.classList.remove("dark");
  }
};

onMounted(() => {
  getTheme();
});
</script>

<style>
@import "../style.css";
</style>
