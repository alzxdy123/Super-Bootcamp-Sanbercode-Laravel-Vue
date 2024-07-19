import { defineStore } from "pinia";

import htmlLogo from "@/assets/images/html-logo.jpg";
import cssLogo from "@/assets/images/css-logo.jpg";
import jsLogo from "@/assets/images/javascript-logo.jpg";
import bootstrapLogo from "@/assets/images/bootstrap-logo.jpg";
import tailwindLogo from "@/assets/images/tailwind-logo.jpg";
import mysqlLogo from "@/assets/images/mysql-logo.jpg";
import jqueryLogo from "@/assets/images/jquery-logo.jpg";
import VueLogo from "@/assets/images/vue-logo.jpg";
import LaravelLogo from "@/assets/images/laravel-logo.jpg";

export const useSkillStore = defineStore("skill", {
  state: () => ({
    skills: [
      {
        category: "Frontend Development",
        items: [
          "HTML & CSS: Crafting responsive, user-friendly web pages with modern, semantic markup.",
          "JavaScript & TypeScript: Building dynamic and interactive user interfaces.",
          "Frameworks: Proficient in Vue.js for creating efficient, maintainable, and scalable web applications.",
        ],
        logos: [
          {
            name: "HTML",
            img: htmlLogo,
          },
          {
            name: "CSS",
            img: cssLogo,
          },
          {
            name: "JavaScript",
            img: jsLogo,
          },
          {
            name: VueLogo,
            img: VueLogo,
          },
        ],
      },
      {
        category: "Backend Development",
        items: [
          "Laravel: Developing fast and scalable server-side applications.",
          "Database Management: Skilled in SQL databases like MySQL .",
        ],
        logos: [
          {
            name: "Laravel",
            img: LaravelLogo,
          },
          {
            name: "MySQL",
            img: mysqlLogo,
          },
        ],
      },
      {
        category: "Design",
        items: [
          "Bootstrap: Utilizing Bootstrap for creating responsive, mobile-first web designs.",
          "Tailwind CSS: Utilizing utility-first CSS framework for rapidly building custom designs.",
        ],
        logos: [
          {
            name: "Bootstrap",
            img: bootstrapLogo,
          },
          {
            name: "Tailwind",
            img: tailwindLogo,
          },
        ],
      },
      {
        category: "Tools & Technologies",
        items: [
          "Version Control: Proficient with Git and GitHub for source code management and collaboration.",
          "Build Tools: Experience with Webpack, Babel, and npm/yarn for efficient project management.",
          "Testing: Writing and executing tests using frameworks like Jest and Cypress to ensure code quality.",
        ],
      },
      {
        category: "Additional Skills",
        items: [
          "Problem-Solving: Strong analytical and problem-solving skills to tackle complex challenges effectively.",
        ],
      },
    ],
  }),
});
