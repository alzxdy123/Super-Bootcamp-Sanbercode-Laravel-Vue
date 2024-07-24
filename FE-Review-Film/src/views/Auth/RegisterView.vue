<template>
  <div class="flex justify-center items-center w-full h-screen movie-bg">
    <div
      class="p-5 w-full h-screen md:h-max md:w-80 flex justify-center items-center flex-col gap-5 rounded-xl bg-glass"
    >
      <h1 class="text-2xl font-bold text-center text-white mb-5">Register</h1>
      <form @submit.prevent="HandleRegis()" class="w-full">
        <div class="flex flex-col mb-5">
          <input
            :class="errMessage.email ? 'border-2 border-red-500' : ''"
            class="w-full rounded-md p-2"
            type="text"
            v-model="formData.email"
            placeholder="Email"
          />
          <p v-if="errMessage.email" class="text-red-500 text-sm">
            {{ errMessage.email[0] }}
          </p>
        </div>
        <div class="flex flex-col mb-5">
          <input
            :class="errMessage.email ? 'border-2 border-red-500' : ''"
            class="w-full rounded-md p-2"
            type="text"
            v-model="formData.name"
            placeholder="Name"
          />
          <p v-if="errMessage.name" class="text-red-500 text-sm">
            {{ errMessage.name[0] }}
          </p>
        </div>
        <div class="flex flex-col mb-5">
          <input
            :class="errMessage.email ? 'border-2 border-red-500' : ''"
            class="w-full rounded-md p-2"
            type="password"
            v-model="formData.password"
            placeholder="Password"
          />
          <p v-if="errMessage.password" class="text-red-500 text-sm">
            {{ errMessage.password[0] }}
          </p>
        </div>
        <div class="flex flex-col mb-5">
          <input
            :class="errMessage.email ? 'border-2 border-red-500' : ''"
            class="w-full rounded-md p-2"
            type="password"
            v-model="formData.password_confirmation"
            placeholder="Password Confirmation"
          />
          <p v-if="errMessage.password" class="text-red-500 text-sm">
            {{ errMessage.password[0] }}
          </p>
        </div>
        <button
          type="submit"
          class="py-2 rounded-md text-md bg-yellow-400 w-full mt-5"
        >
          <Icon v-if="isBusy" icon="svg-spinners:180-ring-with-bg" />
          <span v-else>Sign Up</span>
        </button>
      </form>
      <div>
        <p class="text-white text-sm mt-3 text-center">
          Back To
          <RouterLink class="text-yellow-400" to="/login">Login</RouterLink>
        </p>
      </div>
      <div class="absolute bottom-10 md:bottom-[-40px] w-full left-0">
        <p class="text-white text-sm text-center">
          Go To
          <RouterLink class="text-yellow-400 underline" to="/verifikasi"
            >Verifikasi</RouterLink
          >
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

const router = useRouter();
const isBusy = ref(false);
const errMessage = ref([]);

const formData = reactive({
  email: "",
  name: "",
  password: "",
  password_confirmation: "",
});

const HandleRegis = async () => {
  let reqBody = {
    email: formData.email,
    name: formData.name,
    password: formData.password,
    password_confirmation: formData.password_confirmation,
  };

  isBusy.value = true;
  try {
    await toast.promise(
      AuthService.Regis(reqBody),
      {
        pending: "Registering...",
        success: "Register Success",
        error: "Register Failed",
      },
      {
        autoClose: 2000,
      }
    );
    router.push("/login");
  } catch (err) {
    errMessage.value = err.response.data;
  } finally {
    isBusy.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
