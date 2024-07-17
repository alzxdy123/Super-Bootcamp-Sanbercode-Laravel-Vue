<template>
  <div class="mt-10 ml-5 hidden md:block">
    <div
      class="flex pl-2 lg:pl-0 justify-center gap-3 border-b border-gray-300 pb-12 mb-10"
    >
      <div class="avatar">
        <div class="w-10 rounded-full">
          <img :src="Profile" />
        </div>
      </div>
      <div>
        <h1 class="font-bold hidden lg:block">Aldy Balya Diprana</h1>
        <p class="text-sm hidden lg:block">80996110801</p>
      </div>
    </div>

    <RouterLink
      to="/"
      class="flex justify-center lg:justify-start items-center gap-3 hover:bg-slate-200 lg:w-auto lg:mr-auto p-3 rounded-md cursor-pointer hover:scale-110 mb-5"
      :class="{
        'bg-gradient-linear': $route.path == '/',
      }"
    >
      <i class="jam jam-home font-extrabold text-xl mb-1"></i>
      <h1 class="text-md font-bold hidden lg:block">Home</h1>
    </RouterLink>
    <RouterLink
      to="/about"
      class="flex justify-center lg:justify-start items-center gap-3 hover:bg-slate-200 w-14 lg:w-auto lg:mr-auto p-3 rounded-md cursor-pointer hover:scale-110 mb-5"
      :class="{
        'bg-gradient-linear': $route.path == '/about',
      }"
    >
      <i class="jam jam-user font-extrabold text-xl mb-1"></i>
      <h1 class="text-md font-bold hidden lg:block">About</h1>
    </RouterLink>
    <RouterLink
      to="/project"
      class="flex justify-center lg:justify-start items-center gap-3 hover:bg-slate-200 w-14 lg:w-auto lg:mr-auto p-3 rounded-md cursor-pointer hover:scale-110 mb-5"
      :class="{
        'bg-gradient-linear': $route.path == '/project',
      }"
    >
      <i class="jam jam-layout font-extrabold text-xl mb-1"></i>
      <h1 class="text-md font-bold hidden lg:block">Project</h1>
    </RouterLink>
  </div>
</template>

<script setup>
import Profile from "@/assets/images/profile.png";
</script>
