<template>
  <main
    class="bg-white text-black"
    :class="['w-100 flex h-screen lg:justify-center', isDarkMode ? 'dark' : '']"
  >
    <div class="container flex gap-2">
      <Sidebar />
      <div class="h-full overflow-y-auto custom-scrollbar">
        <RouterView />
      </div>
    </div>
    <Footbar />
  </main>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
import Footbar from "./components/Footbar.vue";
import { ref, onMounted, watch } from "vue";

// Dark mode state
const isDarkMode = ref(false);

// Function to update dark mode state from LocalStorage
const updateDarkModeFromLocalStorage = () => {
  const darkModePreference = localStorage.getItem("darkMode");
  isDarkMode.value = darkModePreference === "true";
  console.log(
    "🚀 ~ updateDarkModeFromLocalStorage ~ isDarkMode:",
    isDarkMode.value
  );
};

// Check for dark mode preference in LocalStorage on mount
onMounted(() => {
  updateDarkModeFromLocalStorage();

  // Add event listener for storage changes
  window.addEventListener("storage", updateDarkModeFromLocalStorage);
});

// Watch for changes to isDarkMode and update LocalStorage
watch(isDarkMode, (newVal) => {
  localStorage.setItem("darkMode", newVal);
  document.documentElement.classList.toggle("dark", newVal);
});
</script>

<style scoped>
.custom-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

.container {
  max-width: 1000px;
}

/* Ensure dark mode styles are defined globally */
.dark .bg-white {
  background-color: #000;
}

.dark .text-black {
  color: #fff;
}
</style>
