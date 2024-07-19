import { defineStore } from "pinia";
import { ref } from "vue";

import htmlLogo from "@/assets/images/html-logo.jpg";
import cssLogo from "@/assets/images/css-logo.jpg";
import jsLogo from "@/assets/images/javascript-logo.jpg";
import vueLogo from "@/assets/images/vue-logo.jpg";
import laravelLogo from "@/assets/images/laravel-logo.jpg";

import project1 from "../assets/projects/project1.png";
import project2 from "../assets/projects/project2.png";
import reviewFilm from "../assets/projects/review-film.png";
import eBengkel from "../assets/projects/e-bengkel.png";

export const useProjectStore = defineStore("project", () => {
  const projects = ref([
    {
      title: "To Do",
      description:
        "TO DO project untuk tugas dari super bootcamp sanber code 2024.",
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
      description:
        "Aplikasi Back End untuk Restfull API bertemakan E - Bengkel. Yg menyediakan layanan untuk admin suatu bengkel melakukan kegiatan administari bengkelnya",
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
      description:
        "Project ini adalah hasil tugas dari Sanbercode Bootcamp. Yang berfungsi untuk menampilkan review film.",
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
