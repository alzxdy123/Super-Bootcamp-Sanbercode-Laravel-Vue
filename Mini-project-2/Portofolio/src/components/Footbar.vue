<template>
  <div class="fixed bottom-5 flex justify-center w-full md:hidden">
    <div
      class="flex gap-5 w-auto px-6 py-3 bg-white dark:bg-slate-900 rounded-3xl shadow-md"
    >
      <RouterLink
        v-for="list in link"
        :key="list.url"
        :to="list.url"
        class="flex justify-center lg:justify-start items-center hover:bg-slate-200 w-10 p-1 rounded-full cursor-pointer hover:scale-110"
        :class="{
          ' bg-gradient-to-r from-primary to-secondary dark:text-black text-white':
            $route.path == list.url,
        }"
      >
        <i class="font-extrabold text-xl" :class="list.icon"></i>
      </RouterLink>

      <div class="relative">
        <button
          @click="toggleOptions"
          class="flex justify-center items-center w-10 p-1 rounded-full hover:bg-gray-300 bg-gradient-to-r hover:dark:from-primary hover:dark:to-secondary cursor-pointer"
        >
          <i
            class="pi pi-cog text-xl dark:text-white hover:dark:text-black"
          ></i>
        </button>

        <div
          v-if="showOptions"
          class="absolute right-0 bottom-full mb-2 bg-white dark:bg-slate-900 dark:border dark:border-slate-400 rounded-md shadow-lg p-3 w-48"
        >
          <div class="flex flex-col gap-2">
            <button
              @click="changeLocale('en')"
              class="flex justify-between items-center p-2 rounded-md hover:bg-gray-100"
            >
              <span class="dark:text-white">English</span>
              <i class="pi pi-language dark:text-white"></i>
            </button>
            <button
              @click="changeLocale('id')"
              class="flex justify-between items-center p-2 rounded-md hover:bg-gray-100"
            >
              <span class="dark:text-white">Indonesia</span>
              <i class="pi pi-language dark:text-white"></i>
            </button>
          </div>

          <div
            class="flex justify-between items-center mt-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
            @click="toggleDarkTheme"
          >
            <span class="dark:text-white">{{ isDark ? "Dark" : "Light" }}</span>
            <i
              class="dark:text-white"
              :class="isDark ? 'pi pi-moon' : 'pi pi-sun'"
            ></i>
          </div>

          <div class="flex gap-2 mt-2">
            <div
              v-for="theme in themes"
              :key="theme.name"
              class="cursor-pointer w-5 h-5 rounded-full"
              :class="theme.class"
              @click="setTheme(theme.name)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useThemeStore } from "../store/Theme";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";

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

const { t, locale } = useI18n();
const themeStore = useThemeStore();
const { themes, isDark, CurrentTheme } = storeToRefs(themeStore);

const showOptions = ref(false);

const toggleOptions = () => {
  showOptions.value = !showOptions.value;
};

const changeLocale = (newLocale) => {
  locale.value = newLocale;
  localStorage.setItem("locale", newLocale);
  showOptions.value = false;
  window.location.reload();
};

const toggleDarkTheme = () => {
  themeStore.setDarkTheme(!isDark.value);
  showOptions.value = false;
};

const setTheme = (theme) => {
  themeStore.setTheme(theme);
  showOptions.value = false;
};

// Load theme settings on mount
onMounted(() => {
  themeStore.loadThemeSettings();
});
</script>

<style>
@import "../style.css";

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}
</style>
