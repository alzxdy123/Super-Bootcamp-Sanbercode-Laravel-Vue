<template>
  <div
    class="flex flex-col justify-center items-center border-t border-slate-400 mb-10 pt-10"
  >
    <h3 class="font-bold">Reach me out</h3>
    <div class="mt-2 flex items-center gap-1 h-10">
      <div class="p-1 rounded-lg cursor-pointer" v-for="list in lists">
        <a
          :href="list.url"
          target="_blank"
          class="text-2xl hover:bg-gradient-linear hover:text-transparent hover:bg-clip-text text hover:text-3xl"
          :class="list.icon"
        ></a>
      </div>
    </div>

    <h3 class="text-sm mt-10 mb-5">Copyright &copy; 2024</h3>
  </div>
</template>

<script setup>
import { ref } from "vue";

const lists = ref([
  {
    url: "https://github.com/alzxdy123",
    icon: "jam jam-github",
  },
  {
    url: "https://www.linkedin.com/in/aldy-balya-diprana-7325252ba",
    icon: "jam jam-linkedin",
  },
  {
    url: "https://t.me/AldyBD",
    icon: "pi pi-telegram",
  },
]);
</script>
