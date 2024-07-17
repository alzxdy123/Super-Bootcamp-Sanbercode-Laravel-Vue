<template>
  <div class="wrapper hidden md:block">
    <Profile :hidden="true" :border="true" :padding="true" />

    <div class="border-bottom-1 break">
      <RouterLink
        v-for="list in NavLists"
        :to="list.path"
        class="flex justify-center lg:justify-start items-center gap-3 p-3 mb-5 rounded-md cursor-pointer hover:scale-110 hover:bg-slate-200 lg:w-auto lg:mr-auto"
        :class="{
          'active-link': $route.path == list.path,
        }"
      >
        <i :class="'jam jam-' + list.icon + ' font-extrabold text-xl mb-1'"></i>
        <h1 class="text-md font-bold hidden lg:block">{{ list.name }}</h1>
      </RouterLink>
    </div>

    <div>
      <div class="w-full flex flex-wrap gap-3">
        <!-- <i
          class="jam jam-sun-f text-yellow-300 text-3xl dark:text-white"
        ></i>
        <i
          class="jam jam-moon-f text-3xl text-slate-400"
        ></i> -->

        <button @click="toggleDarkMode">
          {{ isDarkMode ? "Light Mode" : "Dark Mode" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Profile from "@/components/Profile.vue";
import { ref, reactive, onMounted, watch } from "vue";

const NavLists = reactive([
  {
    name: "Home",
    path: "/",
    icon: "home",
  },
  {
    name: "About",
    path: "/about",
    icon: "user",
  },
  {
    name: "Project",
    path: "/project",
    icon: "layout",
  },
]);

const isDarkMode = ref(false);

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("darkMode", isDarkMode.value);

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
