<template>
  <div>
    <Title title="about" subTitle="story about me"></Title>

    <section class="ml-5 lg:ml-10" style="max-width: 700px">
      <p class="border-b border-gray-400 pb-10 mb-10 text-sm">
        Hi! I'm Aldy. I started learning web development at the beginning of the
        pandemic. With not much else to do, I decided to begin my web
        development journey through web development forums. After that, I
        started watching various YouTube videos to delve deeper into web
        development, especially in terms of frontend development. <br />
        <br />
        I'm eager to expand my knowledge and skills in frontend development, as
        there is a vast array of technologies and concepts to explore. I find
        great satisfaction in the process of acquiring new information and
        techniques, and I'm highly motivated to keep learning and growing. I
        value constructive feedback as it helps me refine my abilities and
        enhance my overall proficiency. <br />
        <br />
        Through this website, I plan to share my thoughts and showcase the
        projects I've worked on. I firmly believe that documenting what I've
        learned is an excellent method to solidify my understanding, and it also
        allows me to impart my knowledge with others. Please don't hesitate to
        reach out, and I'll be delighted to assist you!
      </p>

      <h1 class="text-2xl font-bold mb-5">Current framework</h1>

      <div class="mb-10 pb-10 flex gap-5 border-b border-gray-400">
        <img :src="VueLogo" alt="Vue JS logo" width="70" />
        <img :src="LaravelLogo" alt="Vue JS logo" width="70" />
      </div>

      <h1 class="text-2xl font-bold mb-5">Skill</h1>

      <div class="flex gap-5 mb-20 flex-wrap">
        <img src="../assets/images/html-logo.jpg" alt="" width="70" />
        <img src="../assets/images/css-logo.jpg" alt="" width="70" />
        <img src="../assets/images/javascript-logo.jpg" alt="" width="70" />
        <img src="../assets/images/bootstrap-logo.jpg" alt="" width="70" />
        <img src="../assets/images/tailwind-logo.jpg" alt="" width="70" />
        <img src="../assets/images/mysql-logo.jpg" alt="" width="70" />
        <img src="../assets/images/jquery-logo.jpg" alt="" width="70" />
      </div>

      <Footer />
    </section>
  </div>
</template>

<script setup>
import Title from "../components/Title.vue";
import Footer from "../components/Footer.vue";
import VueLogo from "@/assets/images/vue-logo.jpg";
import LaravelLogo from "@/assets/images/laravel-logo.jpg";
</script>
