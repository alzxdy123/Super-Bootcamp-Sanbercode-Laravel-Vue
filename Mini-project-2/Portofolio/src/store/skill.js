import { defineStore } from "pinia";
import { useI18n } from "vue-i18n";

import htmlLogo from "@/assets/images/html-logo.png";
import cssLogo from "@/assets/images/css-logo.png";
import jsLogo from "@/assets/images/javascript-logo.jpg";
import bootstrapLogo from "@/assets/images/bootstrap-logo.png";
import tailwindLogo from "@/assets/images/tailwind-logo.png";
import mysqlLogo from "@/assets/images/mysql-logo.png";
import jqueryLogo from "@/assets/images/jquery-logo.png";
import VueLogo from "@/assets/images/vue-logo.png";
import LaravelLogo from "@/assets/images/laravel-logo.png";
import scssLogo from "@/assets/images/scss-logo.jpg";
import { ref } from "vue";

export const useSkillStore = defineStore("skill", () => {
  const { t } = useI18n();
  const skills = ref([
    {
      category: "Frontend Development",
      items: [
        t("skills.frontend.item1"),
        t("skills.frontend.item2"),
        t("skills.frontend.item3"),
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
          name: "Vue",
          img: VueLogo,
        },
      ],
    },
    {
      category: "Backend Development",
      items: [t("skills.backend.item1"), t("skills.backend.item2")],
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
      category: t("skills.design.title"),
      items: [t("skills.design.item1"), t("skills.design.item2")],
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
      category: t("skills.tools.title"),
      items: [
        t("skills.tools.item1"),
        t("skills.tools.item2"),
        t("skills.tools.item3"),
      ],
    },
    {
      category: t("skills.additional.title"),
      items: [t("skills.additional.item1")],
    },
  ]);

  const skillLogo = ref([
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
      name: "Bootstrap",
      img: bootstrapLogo,
    },
    {
      name: "Tailwind",
      img: tailwindLogo,
    },
    {
      name: "MySQL",
      img: mysqlLogo,
    },
    {
      name: "jQuery",
      img: jqueryLogo,
    },
    {
      name: "Sass",
      img: scssLogo,
    },
  ]);

  const frameworks = ref([
    {
      name: "Vue Js",
      img: VueLogo,
    },
    {
      name: "Laravel",
      img: LaravelLogo,
    },
  ]);

  return { skills, skillLogo, frameworks };
});
