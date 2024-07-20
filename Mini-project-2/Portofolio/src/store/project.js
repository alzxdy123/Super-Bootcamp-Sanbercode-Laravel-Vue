import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import htmlLogo from "@/assets/images/html-logo.png";
import cssLogo from "@/assets/images/css-logo.png";
import jsLogo from "@/assets/images/javascript-logo.jpg";
import vueLogo from "@/assets/images/vue-logo.png";
import laravelLogo from "@/assets/images/laravel-logo.png";

import project1 from "../assets/projects/project1.png";
import project2 from "../assets/projects/project2.png";
import reviewFilm from "../assets/projects/review-film.png";
import eBengkel from "../assets/projects/e-bengkel.png";

export const useProjectStore = defineStore("project", () => {
  const { t } = useI18n();
  const projects = ref([
    {
      title: "To Do",
      description: t("project.projects.description1"),
      img: project2,
      url: "https://github.com/alzxdy123/Super-Bootcamp-Sanbercode-Laravel-Vue/tree/main/Quiz%202",
      skill: [
        {
          name: "vue",
          img: vueLogo,
        },
        {
          name: "html",
          img: htmlLogo,
        },
        {
          name: "css",
          img: cssLogo,
        },
      ],
    },
    {
      title: "BE E - Bengkel",
      description: t("project.projects.description2"),
      img: eBengkel,
      url: "https://documenter.getpostman.com/view/32768863/2sA3kSp45U",
      skill: [
        {
          name: "laravel",
          img: laravelLogo,
        },
      ],
    },
    {
      title: "BE Review Film",
      description: t("project.projects.description3"),
      img: reviewFilm,
      url: "https://documenter.getpostman.com/view/32768863/2sA3XY5d4b",
      skill: [
        {
          name: "laravel",
          img: laravelLogo,
        },
      ],
    },
  ]);

  return { projects };
});
