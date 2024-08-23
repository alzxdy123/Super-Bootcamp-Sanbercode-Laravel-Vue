import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import htmlLogo from "@/assets/images/html-logo.png";
import cssLogo from "@/assets/images/css-logo.png";
import jsLogo from "@/assets/images/javascript-logo.jpg";
import vueLogo from "@/assets/images/vue-logo.png";
import laravelLogo from "@/assets/images/laravel-logo.png";
import BootstrapLogo from "@/assets/images/bootstrap-logo.png";
import sassLogo from "@/assets/images/scss-logo.jpg";

import project1 from "../assets/projects/project1.png";
import project2 from "../assets/projects/project2.png";
import reviewFilm from "../assets/projects/review-film.png";
import eBengkel from "../assets/projects/e-bengkel.png";

import ibb1 from "../assets/projects/ibb1.png";
import ibb2 from "../assets/projects/ibb2.png";
import va1 from "../assets/projects/va1.png";
import va2 from "../assets/projects/va2.png";

export const useProjectStore = defineStore("project", () => {
  const { t } = useI18n();
  const projects = ref([
    {
      title: "Bank Mandiri Taspen KALSEL IBB Admin",
      description: t("ibb-admin.desc1"),
      img: ibb2,
      status: "not public",
      detail: "/project/ibb-admin",
      skill: [
        {
          name: "vue",
          img: vueLogo,
        },
      ],
    },
    {
      title: "Bank Mandiri Taspen KALSEL Virtual Account",
      description: t("project.projects.description1"),
      img: va2,
      status: "not public",
      detail: "/project/ibb-va",
      skill: [
        {
          name: "vue",
          img: vueLogo,
        },
      ],
    },
    {
      title: "BE Review Film",
      description: t("project.projects.description3"),
      img: reviewFilm,
      status: "public",
      postman: "https://documenter.getpostman.com/view/32768863/2sA3XY5d4b",
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
