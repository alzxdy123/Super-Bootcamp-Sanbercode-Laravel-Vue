import { defineStore } from "pinia";
export const useThemeStore = defineStore("theme", {
  state: () => ({
    currentTheme: "dark",
  }),
  actions: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === "cupcake" ? "dark" : "cupcake";
      document.documentElement.setAttribute("data-theme", this.currentTheme);
    },
    setTheme(theme) {
      this.currentTheme = theme;
      document.documentElement.setAttribute("data-theme", theme);
    },
  },
});

const themeStore = useThemeStore();
const toggleTheme = () => {
  themeStore.toggleTheme();
};
onMounted(() => {
  document.documentElement.setAttribute("data-theme", themeStore.currentTheme);
});
