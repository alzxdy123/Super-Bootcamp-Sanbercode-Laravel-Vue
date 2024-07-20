<template>
  <main
    :class="[
      isDark ? 'dark' : '',
      CurrentTheme.length ? 'theme-' + CurrentTheme : '',
    ]"
  >
    <div
      class="bg-white dark:bg-slate-950 dark:text-white text-black w-100 flex h-screen lg:justify-center"
    >
      <div class="container flex gap-2">
        <Sidebar />
        <div class="h-full overflow-y-auto custom-scrollbar">
          <RouterView v-slot="{ Component, route }">
            <Transition name="bounce">
              <component :is="Component" :key="route.path" />
            </Transition>
          </RouterView>
        </div>
      </div>
      <Footbar />
    </div>
  </main>
</template>
<script setup>
import Sidebar from "./components/Sidebar.vue";
import Footbar from "./components/Footbar.vue";
import { RouterView } from "vue-router";
import { ref, computed } from "vue";
import { useThemeStore } from "./store/Theme";

const themeStore = useThemeStore();
const isDark = computed(() => themeStore.isDark);
const CurrentTheme = computed(() => themeStore.CurrentTheme);

themeStore.loadThemeSettings();
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
  max-width: 1100px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in versions <2.1.8 */ {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-10px);
  }
  50% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(-10px);
  }
}
</style>
