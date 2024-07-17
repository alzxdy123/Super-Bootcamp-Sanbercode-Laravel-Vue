<template>
  <main class="w-100 flex h-screen lg:justify-center">
    <div class="flex gap-2" style="width: 1000px">
      <Sidebar></Sidebar>
      <RouterView class="h-full overflow-y-auto custom-scrollbar"></RouterView>
    </div>
    <Footbar></Footbar>
  </main>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
import Footbar from "./components/Footbar.vue";
</script>

<style scoped>
.custom-scrollbar {
  /* For modern browsers */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

.custom-scrollbar::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just to avoid flashing effect */
}
</style>
