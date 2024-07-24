<template>
  <footer class="bg-gray-800 text-white py-10">
    <div
      class="container mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start"
    >
      <div class="mb-6 lg:mb-0">
        <h2 class="text-2xl font-bold mb-2 text-yellow-400">Review Film</h2>
        <p>&copy; 2024 Review Film. All rights reserved.</p>
      </div>
      <div class="flex flex-col lg:flex-row gap-10">
        <div>
          <h3 class="font-bold mb-2 text-yellow-400">Links</h3>
          <ul class="flex gap-5">
            <li class="hover:text-yellow-400">
              <RouterLink to="/dashboard">Home</RouterLink>
            </li>
            <li class="hover:text-yellow-400">
              <RouterLink to="/film">Film</RouterLink>
            </li>
            <li class="hover:text-yellow-400">
              <RouterLink to="/cast">Cast</RouterLink>
            </li>
            <li class="hover:text-yellow-400">
              <RouterLink to="/genre">Genre</RouterLink>
            </li>
            <li class="hover:text-yellow-400" v-if="!isVerified">
              <RouterLink to="/verifikasi">Verifikasi</RouterLink>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold mb-2 text-yellow-400">Follow Us</h3>
          <ul class="flex gap-4">
            <li class="hover:text-yellow-400">
              <a href="#"><Icon icon="mdi:facebook" /></a>
            </li>
            <li class="hover:text-yellow-400">
              <a href="#"><Icon icon="mdi:twitter" /></a>
            </li>
            <li class="hover:text-yellow-400">
              <a href="#"><Icon icon="mdi:instagram" /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const { isVerified } = userStore;
</script>

<style scoped>
footer {
  background-color: #1f2937; /* Tailwind's bg-gray-800 */
  color: #ffffff; /* Tailwind's text-white */
}

footer a {
  color: inherit; /* Inherit text color from parent */
  text-decoration: none;
}

footer a:hover {
  text-decoration: underline;
}
</style>
