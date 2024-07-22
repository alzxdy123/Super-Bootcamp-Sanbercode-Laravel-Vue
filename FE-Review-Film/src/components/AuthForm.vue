<template>
  <div class="p-5 w-1/4 flex flex-col gap-5 rounded-xl bg-glass">
    <h1 class="text-2xl font-bold text-center text-white mb-5">{{ title }}</h1>
    <label
      v-if="register"
      class="input input-bordered rounded-none flex items-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="h-4 w-4 opacity-70"
      >
        <path
          d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
        />
        <path
          d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
        />
      </svg>
      <input type="text" class="grow" placeholder="Email" />
    </label>
    <label class="input input-bordered rounded-none flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="h-4 w-4 opacity-70"
      >
        <path
          d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
        />
      </svg>
      <input type="text" class="grow" placeholder="Username" />
    </label>
    <label class="input input-bordered rounded-none flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        class="h-4 w-4 opacity-70"
      >
        <path
          fill-rule="evenodd"
          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
          clip-rule="evenodd"
        />
      </svg>
      <input type="password" class="grow" value="password" />
    </label>
    <div class="my-5">
      <button class="py-2 rounded-md text-md bg-yellow-400 w-full">
        {{ title }}
      </button>
      <p v-if="!register" class="text-white text-sm mt-3 text-center">
        Dont have an account?
        <RouterLink class="text-yellow-400" to="/register"
          >Register Here!</RouterLink
        >
      </p>
      <p v-else class="text-white text-sm mt-3 text-center">
        Already Have Account?
        <RouterLink class="text-yellow-400" to="/login">Login</RouterLink>
      </p>
    </div>
    <div class="absolute bottom-[-40px] w-full left-0">
      <p class="text-white text-sm text-center">
        Go To
        <RouterLink class="text-yellow-400 underline" to="/dashboard"
          >Dashboard</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  register: {
    type: Boolean,
    default: false,
  },
});

const title = computed(() => {
  return props.register ? "Register" : "Login";
});
</script>
