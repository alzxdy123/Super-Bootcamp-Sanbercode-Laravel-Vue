<template>
  <div>
    <Title title="Projects" subTitle="My Project" />

    <section class="lg:ml-10" style="max-width: 700px">
      <div class="flex justify-center flex-wrap gap-10 mb-20">
        <div class="w-80 rounded-md h-auto flex flex-col shadow-xl">
          <div class="skeleton w-full h-40 rounded-none"></div>
          <div class="p-5">
            <div class="flex gap-2 items-center">
              <i class="jam jam-circle-f text-green-300 text-sm"></i>
              <h1 class="font-extrabold text-lg">Project Title</h1>
            </div>
            <p class="text-sm mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates error perferendis vitae repellendus? Quibusdam sint
              explicabo sunt! Quod, esse laudantium.
            </p>

            <div class="flex gap-5 mt-5">
              <img src="../assets/images/html-logo.jpg" width="30" alt="" />
              <img src="../assets/images/css-logo.jpg" width="30" alt="" />
              <img
                src="../assets/images/javascript-logo.jpg"
                width="30"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="w-80 rounded-md h-auto flex flex-col shadow-xl">
          <div class="skeleton w-full h-40 rounded-none"></div>
          <div class="p-5">
            <div class="flex gap-2 items-center">
              <i class="jam jam-circle-f text-green-300 text-sm"></i>
              <h1 class="font-extrabold text-lg">Project Title</h1>
            </div>
            <p class="text-sm mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates error perferendis vitae repellendus? Quibusdam sint
              explicabo sunt! Quod, esse laudantium.
            </p>

            <div class="flex gap-5 mt-5">
              <img src="../assets/images/html-logo.jpg" width="30" alt="" />
              <img src="../assets/images/css-logo.jpg" width="30" alt="" />
              <img
                src="../assets/images/javascript-logo.jpg"
                width="30"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="w-80 rounded-md h-auto flex flex-col shadow-xl">
          <div class="skeleton w-full h-40 rounded-none"></div>
          <div class="p-5">
            <div class="flex gap-2 items-center">
              <i class="jam jam-circle-f text-green-300 text-sm"></i>
              <h1 class="font-extrabold text-lg">Project Title</h1>
            </div>
            <p class="text-sm mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates error perferendis vitae repellendus? Quibusdam sint
              explicabo sunt! Quod, esse laudantium.
            </p>

            <div class="flex gap-5 mt-5">
              <img src="../assets/images/html-logo.jpg" width="30" alt="" />
              <img src="../assets/images/html-logo.jpg" width="30" alt="" />
              <img src="../assets/images/html-logo.jpg" width="30" alt="" />
            </div>
          </div>
        </div>
        <div class="w-80 rounded-md h-auto flex flex-col shadow-xl">
          <div class="skeleton w-full h-40 rounded-none"></div>
          <div class="p-5">
            <div class="flex gap-2 items-center">
              <i class="jam jam-circle-f text-green-300 text-sm"></i>
              <h1 class="font-extrabold text-lg">Project Title</h1>
            </div>
            <p class="text-sm mt-4">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates error perferendis vitae repellendus? Quibusdam sint
              explicabo sunt! Quod, esse laudantium.
            </p>

            <div class="flex gap-5 mt-5">
              <img src="../assets/images/html-logo.jpg" width="30" alt="" />
              <img src="../assets/images/css-logo.jpg" width="30" alt="" />
              <img
                src="../assets/images/javascript-logo.jpg"
                width="30"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  </div>
</template>

<script setup>
import Title from "@/components/Title.vue";
import Footer from "@/components/Footer.vue";
</script>
