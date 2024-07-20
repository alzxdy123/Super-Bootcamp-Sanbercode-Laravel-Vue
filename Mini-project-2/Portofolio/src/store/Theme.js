import { defineStore } from "pinia";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isDark: false,
    CurrentTheme: "cyan",
    themes: [
      {
        name: "cyan",
        class: "bg-gradient-to-r from-green-200 to-cyan-300",
      },
      {
        name: "orange",
        class: "bg-gradient-to-r from-orange-400 to-red-400",
      },
      {
        name: "purple",
        class: "bg-gradient-to-r from-pink-400 to-purple-500",
      },
      {
        name: "blue",
        class: "bg-gradient-to-tr from-[#40c9ff] to-[#e81cff] ",
      },
    ],
  }),

  actions: {
    setDarkTheme(params) {
      this.isDark = params;
      this.saveThemeSettings();
    },

    setTheme(theme) {
      this.CurrentTheme = theme;
      this.saveThemeSettings();
    },

    saveThemeSettings() {
      const themeSettings = {
        isDark: this.isDark,
        CurrentTheme: this.CurrentTheme,
      };
      localStorage.setItem("themeSettings", JSON.stringify(themeSettings));
    },

    loadThemeSettings() {
      const themeSettings = localStorage.getItem("themeSettings");
      if (themeSettings) {
        const parsedSettings = JSON.parse(themeSettings);
        this.isDark = parsedSettings.isDark;
        this.CurrentTheme = parsedSettings.CurrentTheme;
      }
    },
  },
});
