<template>
  <div class="fixed bottom-5 flex justify-center w-full md:hidden">
    <div
      class="flex gap-5 w-auto px-6 py-3 bg-white rounded-3xl shadow-md shadow-cyan-300"
    >
      <RouterLink
        to="/"
        class="flex justify-center lg:justify-start items-center hover:bg-slate-200 w-14 p-3 rounded-full cursor-pointer hover:scale-110"
        :class="{
          'bg-gradient-linear': $route.path == '/home',
        }"
      >
        <i class="jam jam-home font-extrabold text-2xl"></i>
      </RouterLink>
      <RouterLink
        to="/about"
        class="flex justify-center lg:justify-start items-center hover:bg-slate-200 w-14 p-3 rounded-full cursor-pointer hover:scale-110"
        :class="{
          'bg-gradient-linear': $route.path == '/about',
        }"
      >
        <i class="jam jam-user font-extrabold text-2xl"></i>
      </RouterLink>
      <RouterLink
        to="/project"
        class="flex justify-center lg:justify-start items-center hover:bg-slate-200 w-14 p-3 rounded-full cursor-pointer hover:scale-110"
        :class="{
          'bg-gradient-linear': $route.path == '/project',
        }"
      >
        <i class="jam jam-layout font-extrabold text-2xl"></i>
      </RouterLink>
    </div>
  </div>
</template>

<script setup></script>
