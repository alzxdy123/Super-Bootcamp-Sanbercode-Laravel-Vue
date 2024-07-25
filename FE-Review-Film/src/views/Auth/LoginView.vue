<template>
  <div class="flex justify-center items-center w-full h-screen movie-bg">
    <div
      class="p-5 w-full h-screen md:h-max md:w-80 flex justify-center items-center flex-col gap-5 rounded-xl bg-glass"
    >
      <h1 class="text-2xl font-bold text-center text-white mb-5">Login</h1>
      <form @submit.prevent="HandleLogin()" class="w-full">
        <div class="flex flex-col mb-5">
          <input
            type="text"
            class="w-full rounded-md p-2"
            placeholder="email"
            v-model="formData.email"
            :class="errMessage.length ? ' border-2 border-red-500' : ''"
          />
        </div>
        <div class="flex flex-col mb-5">
          <input
            type="password"
            class="w-full rounded-md p-2"
            placeholder="password"
            v-model="formData.password"
            :class="errMessage.length ? ' border-2 border-red-500' : ''"
          />
        </div>
        <button
          type="submit"
          class="py-2 rounded-md text-md bg-yellow-400 w-full mt-5 flex justify-center items-center"
        >
          <Icon v-if="isBusy" icon="svg-spinners:180-ring-with-bg" />
          <span v-else>Login</span>
        </button>
      </form>
      <div>
        <p class="text-white text-sm mt-3 text-center">
          Dont have an account?
          <RouterLink class="text-yellow-400" to="/register"
            >Register Here!</RouterLink
          >
        </p>
      </div>
      <div class="absolute bottom-[-40px]">
        <p class="text-white text-sm mt-3 text-center">
          Back To
          <RouterLink class="text-yellow-400" to="/">Home</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Functions from "@/tools/Functions";
import AuthService from "@/services/AuthService";
import { reactive, ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const router = useRouter();
const isBusy = ref(false);
const errMessage = reactive([]);

const formData = reactive({
  email: "user2@gmail.com",
  password: "123456",
});

const HandleLogin = () => {
  let reqBody = {
    email: formData.email,
    password: formData.password,
  };

  isBusy.value = true;

  AuthService.Login(reqBody)
    .then((res) => {
      isBusy.value = false;
      let data = res.data;

      userStore.setCurrentUser(data.data);
      Functions.SaveSessionCustom("user", data.data);
      Functions.SaveSessionCustom("token", data.token);
      router.push({ path: "/dashboard" });
    })
    .catch((err) => {
      console.log(err);
      isBusy.value = false;
      let message = err.response.data.error;
      errMessage.push(message);

      toast.error(message);
    });
};
</script>
