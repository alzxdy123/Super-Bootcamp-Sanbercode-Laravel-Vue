<template>
  <div>
    <Title title="about" subTitle="story about me"></Title>

    <section class="wrapper" style="max-width: 600px">
      <div class="border-bottom-1 break">
        <p v-for="about in abouts" class="text-base">{{ about }} <br /></p>
      </div>

      <div class="border-bottom-1 break">
        <h1 class="text-2xl font-bold mb-10">Current framework</h1>
        <div class="flex gap-5">
          <img
            v-for="framework in frameworks"
            :src="framework.img"
            :alt="framework.name"
            width="70"
          />
        </div>
      </div>

      <div class="break">
        <h1 class="text-2xl font-bold mb-5">Skill</h1>
        <div class="flex gap-5 flex-wrap pb-4">
          <img
            v-for="skill in skills"
            :src="skill.img"
            :alt="skill.name"
            width="70"
          />
        </div>
      </div>

      <Footer />
    </section>
  </div>
</template>

<script setup>
import Title from "../components/Title.vue";
import Footer from "../components/Footer.vue";
import { reactive } from "vue";

const abouts = reactive([
  "Hi! I'm Aldy. I started learning web development at the beginning of the pandemic. With not much else to do, I decided to begin my web development journey through web development forums. After that, I started watching various YouTube videos to delve deeper into web development, especially in terms of frontend development.",
  ,
  "I'm eager to expand my knowledge and skills in frontend development, as there is a vast array of technologies and concepts to explore. I find great satisfaction in the process of acquiring new information and techniques, and I'm highly motivated to keep learning and growing. I value constructive feedback as it helps me refine my abilities and enhance my overall proficiency.",
  ,
  "Through this website, I plan to share my thoughts and showcase the projects I've worked on. I firmly believe that documenting what I've learned is an excellent method to solidify my understanding, and it also allows me to impart my knowledge with others. Please don't hesitate to reach out, and I'll be delighted to assist you!",
  ,
]);

import VueLogo from "@/assets/images/vue-logo.jpg";
import LaravelLogo from "@/assets/images/laravel-logo.jpg";

const frameworks = reactive([
  {
    name: "Vue Js",
    img: VueLogo,
  },
  {
    name: "Laravel",
    img: LaravelLogo,
  },
]);

import htmlLogo from "@/assets/images/html-logo.jpg";
import cssLogo from "@/assets/images/css-logo.jpg";
import jsLogo from "@/assets/images/javascript-logo.jpg";
import bootstrapLogo from "@/assets/images/bootstrap-logo.jpg";
import tailwindLogo from "@/assets/images/tailwind-logo.jpg";
import mysqlLogo from "@/assets/images/mysql-logo.jpg";
import jqueryLogo from "@/assets/images/jquery-logo.jpg";

const skills = reactive([
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
]);
</script>
