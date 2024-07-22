<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div>
    <div class="navbar bg-yellow-400 px-10">
      <div class="flex-1">
        <p class="text-xl font-bold">Review Film</p>
      </div>
      <div class="hidden md:block">
        <div class="flex menu menu-horizontal px-1">
          <RouterLink
            to="/dashboard"
            class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white"
            :class="{ active: $route.path == '/dashboard' }"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/film"
            class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white"
            :class="{ active: $route.path == '/film' }"
          >
            Film
          </RouterLink>
          <RouterLink
            to="/cast"
            class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white"
            :class="{ active: $route.path == '/cast' }"
          >
            Cast
          </RouterLink>
          <RouterLink
            to="/genre"
            class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white"
            :class="{ active: $route.path == '/genre' }"
          >
            Genre
          </RouterLink>
          <RouterLink
            to="/verifikasi"
            class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white"
          >
            Verifikasi
          </RouterLink>
          <RouterLink
            to="/login"
            class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white flex items-center"
          >
            <Icon icon="mdi:power" class="mr-1 text-red-600"></Icon>
            Logout
          </RouterLink>
        </div>
      </div>
      <div class="md:hidden">
        <div
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle"
          @click="toggleMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
      </div>
    </div>
    <div v-show="isMenuOpen" class="md:hidden mt-2">
      <div class="menu menu-vertical px-1">
        <RouterLink
          to="/dashboard"
          class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white"
          :class="{ active: $route.path == '/dashboard' }"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/film"
          class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white"
          :class="{ active: $route.path == '/film' }"
        >
          Film
        </RouterLink>
        <RouterLink
          to="/cast"
          class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white"
          :class="{ active: $route.path == '/cast' }"
        >
          Cast
        </RouterLink>
        <RouterLink
          to="/genre"
          class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white"
          :class="{ active: $route.path == '/genre' }"
        >
          Genre
        </RouterLink>
        <RouterLink
          to="/verifikasi"
          class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white"
        >
          Verifikasi
        </RouterLink>
        <RouterLink
          to="/login"
          class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white flex items-center"
        >
          <Icon icon="mdi:power" class="mr-1 text-red-600"></Icon>
          Logout
        </RouterLink>
      </div>
    </div>
  </div>
</template>
