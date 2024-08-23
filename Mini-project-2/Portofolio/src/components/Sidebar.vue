<template>
  <div class="wrapper hidden md:block">
    <Profile :hidden="true" :border="true" :padding="true" />

    <div class="border-bottom-1">
      <RouterLink
        v-for="list in NavLists"
        :to="list.path"
        class="flex justify-center lg:justify-start items-center gap-3 p-3 mb-5 rounded-md cursor-pointer hover:scale-110 hover:bg-slate-200 lg:w-auto lg:mr-auto hover:dark:bg-slate-900"
        :class="{
          ' bg-gradient-to-r from-primary to-secondary dark:text-black text-white':
            $route.path == list.path || $route.path == list.detail,
        }"
      >
        <i :class="list.icon + ' font-extrabold text-xl mb-1'"></i>
        <h1 class="text-md font-bold hidden lg:block">
          {{ list.name }}
        </h1>
      </RouterLink>
    </div>

    <div class="w-full border-b border-slate-400 pb-7 pl-3 pt-5">
      <div class="relative my-5 cursor-pointer" @click="toggleLanguageOptions">
        <div>
          <i class="pi pi-language text-xl mb-4 mr-4"></i>
          <span class="text-md font-bold">{{ currentLanguage }}</span>
          <i v-if="!showLanguageOptions" class="jam jam-chevron-up ml-5"></i>
          <i v-else class="jam jam-chevron-down ml-5"></i>
        </div>
        <div
          v-if="showLanguageOptions"
          class="absolute right-0 bottom-full p-2 mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg rounded-md"
        >
          <button
            @click="changeLocale('en')"
            class="text-sm font-bold p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            English
          </button>
          <button
            @click="changeLocale('id')"
            class="text-sm font-bold p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Indonesia
          </button>
        </div>
      </div>

      <div
        class="w-full flex flex-wrap gap-3 md:justify-center lg:justify-start mt-3"
      >
        <button
          @click="setDarkTheme(false)"
          class="text-sm font-bold p-3 rounded-md bg-gradient-to-r from-primary to-secondary dark:bg-none text-white"
        >
          {{ $t("sidebar.light") }}
        </button>
        <button
          @click="setDarkTheme(true)"
          class="text-sm font-bold p-3 rounded-md bg-gradient-to-r dark:from-primary dark:to-secondary dark:text-black"
        >
          {{ $t("sidebar.dark") }}
        </button>
      </div>
    </div>
    <div class="flex flex-col w-full gap-2 mt-5">
      <h1 class="text-md font-bold mb-2">{{ $t("sidebar.theme") }}</h1>
      <div class="flex gap-2">
        <div
          v-for="theme in themes"
          :key="theme"
          class="cursor-pointer w-5 h-5 rounded-full"
          :class="theme.class"
          @click="setTheme(theme.name)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Profile from "@/components/Profile.vue";
import { ref, reactive, computed } from "vue";
import { useThemeStore } from "../store/Theme";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const NavLists = reactive([
  {
    name: "Home",
    path: "/",
    icon: " jam jam-home",
  },
  {
    name: t("sidebar.about"),
    path: "/about",
    icon: " jam jam-user",
  },
  {
    name: t("sidebar.project"),
    path: "/project",
    icon: "jam jam-layout",
    detail: ["/project/ibb-admin"],
  },
  {
    name: t("sidebar.skill"),
    path: "/skill",
    icon: "pi pi-code",
  },
]);

const themeStore = useThemeStore();
const setDarkTheme = (isDark) => {
  themeStore.setDarkTheme(isDark);
};

const { themes } = storeToRefs(themeStore);

const setTheme = (theme) => {
  themeStore.setTheme(theme);
};

const currentLanguage = computed(() => {
  const languages = {
    en: "English",
    id: "Indonesia",
  };
  return languages[locale.value];
});

const changeLocale = (newLocale) => {
  locale.value = newLocale;
  localStorage.setItem("locale", newLocale);
  window.location.reload();
};

const showLanguageOptions = ref(false);
const toggleLanguageOptions = () => {
  showLanguageOptions.value = !showLanguageOptions.value;
};
</script>
