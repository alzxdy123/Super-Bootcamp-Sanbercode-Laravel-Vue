<template>
  <div>
    <Title
      title="Home"
      subTitle="Introduction and Professional Career Journey."
    ></Title>

    <section class="ml-5 lg:ml-10" style="max-width: 700px">
      <div class="flex pl-2 lg:pl-0 gap-3 mb-12 md:hidden">
        <div class="avatar">
          <div class="w-10 rounded-full">
            <img src="@/assets/images/profile.png" />
          </div>
        </div>
        <div>
          <h1 class="font-bold">Aldy Balya Diprana</h1>
          <p class="text-sm">80996110801</p>
        </div>
      </div>

      <div class="border-b border-gray-400 pb-10 mb-5">
        <h1 class="text-3xl font-extrabold">
          Call me
          <span class="bg-gradient-to-r from-green-300 to-cyan-200">Aldy</span>
        </h1>
        <p class="mt-4 mb-4">Fullstack Developer</p>
        <p>
          Working within Vue Js & Laravel, transform ideas into digital
          realities that are <br />
          easily accessible and inclusive for web users.
        </p>
      </div>

      <div class="pb-10">
        <h1 class="text-lg font-bold my-4 mb-8">
          <i class="pi pi-briefcase mr-3"></i> Experiences
        </h1>

        <div class="flex flex-wrap gap-5">
          <div
            class="border border-slate-500 rounded-lg flex p-5 items-center justify-center gap-8 w-80 shadow-md shadow-gray-300"
          >
            <img src="@/assets/images/pac-logo.jpg" alt="" width="55" />
            <div>
              <h4 class="text-md mb-2 font-bold">Frontend Developer</h4>
              <div class="text-sm mb-2">
                <a
                  class="underline"
                  href="https://pactindo.com/home/"
                  target="_blank"
                  >PT. Sarana Pactindo
                </a>
                <div class="flex items-center gap-2">
                  <i class="jam jam-circle-f" style="font-size: 5px"></i>
                  Bandung
                </div>
              </div>
              <div class="text-sm">October 2023 - Mey 2024</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Title from "../components/Title.vue";
import Footer from "../components/Footer.vue";
</script>
