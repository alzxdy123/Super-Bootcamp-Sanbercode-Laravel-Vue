<script setup>
import AuthService from "@/services/AuthService";
import Functions from "@/tools/Functions";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const isMenuOpen = ref(false);
const username = ref("User");
const router = useRouter();
const userStore = useUserStore();
const isBusy = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const HandleLogout = () => {
  isBusy.value = true;
  AuthService.Logout()
    .then((res) => {
      isBusy.value = false;
      Functions.RemoveSessionCustom("token");
      Functions.RemoveSessionCustom("user");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

const token = localStorage.getItem("token");

onMounted(() => {
  let user = userStore.currentUser;
  if (user) {
    username.value = user.name;
  }
});
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
            :class="{
              active: $route.path == '/genre' || $route.name == 'genreDetail',
            }"
          >
            Genre
          </RouterLink>
          <div class="relative" v-if="token">
            <div
              class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white flex items-center"
              @click="isMenuOpen = !isMenuOpen"
            >
              <Icon icon="mdi:account" class="mr-1"></Icon>
              {{ username }}
              <Icon icon="mdi:chevron-down" class="ml-1"></Icon>
            </div>
            <div
              v-if="isMenuOpen"
              class="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 z-50"
            >
              <RouterLink
                to="/verifikasi"
                class="block px-4 py-2 hover:bg-gray-200"
                @click="isMenuOpen = false"
                v-if="!userStore.isVerified"
              >
                Verifikasi
              </RouterLink>
              <RouterLink
                to="/profile"
                class="block px-4 py-2 hover:bg-gray-200"
                @click="isMenuOpen = false"
                v-else
              >
                Profile
              </RouterLink>
              <div
                @click="HandleLogout"
                class="block px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center"
              >
                <Icon
                  v-if="isBusy"
                  icon="svg-spinners:180-ring-with-bg"
                  class="mr-1"
                />
                <Icon v-else icon="mdi:power" class="mr-1 text-red-600"></Icon>
                Logout
              </div>
            </div>
          </div>
          <RouterLink
            to="/login"
            class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white"
            v-else
          >
            Login
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
    <div v-show="isMenuOpen" class="md:hidden mt-2 z-50">
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
          @click="isMenuOpen = false"
          v-if="!userStore.isVerified"
        >
          Verifikasi
        </RouterLink>
        <RouterLink
          to="/profile"
          class="mx-1 rounded-lg cursor-pointer px-5 py-1 hover:bg-white"
          @click="isMenuOpen = false"
          v-else
        >
          Profile
        </RouterLink>
        <div
          @click="HandleLogout"
          class="block px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center"
        >
          <Icon
            v-if="isBusy"
            icon="svg-spinners:180-ring-with-bg"
            class="mr-1"
          />
          <Icon v-else icon="mdi:power" class="mr-1 text-red-600"></Icon>
          Logout
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.z-50 {
  z-index: 50;
}
</style>
