<template>
  <div class="flex justify-center items-center w-full mt-32">
    <div class="w-80">
      <h1 class="text-2xl font-bold text-center mb-5">Verifikasi Akun</h1>
      <form @submit.prevent="HandleVerf()" class="w-full">
        <div class="flex flex-col">
          <input
            type="text"
            class="w-full rounded-md p-2 border border-black"
            placeholder="OTP "
            v-model="otp"
            :class="errMessage.length ? ' border-2 border-red-500' : ''"
          />
          <p class="text-red-500 text-sm" v-if="errMessage">
            {{ errMessage }}
          </p>
        </div>
        <button
          type="submit"
          class="py-2 rounded-md text-md bg-yellow-400 w-full mt-5"
        >
          <Icon v-if="isBusy" icon="svg-spinners:180-ring-with-bg" />
          <span v-else>Verifikasi</span>
        </button>
      </form>
      <p
        class="mt-10 text-center cursor-pointer underline"
        @click="HandleGenerate()"
      >
        Generate Ulang <span class="text-yellow-400">OTP</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import AuthService from "@/services/AuthService";
import Functions from "@/tools/Functions";
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const router = useRouter();

const errMessage = ref("");
const isBusy = ref(false);
const otp = ref("");

const HandleVerf = () => {
  if (!otp.value) {
    errMessage.value = "OTP Tidak Boleh Kosong";
    return;
  }

  isBusy.value = true;

  let reqBody = {
    otp: otp.value,
  };

  AuthService.Verifikasi(reqBody)
    .then((res) => {
      isBusy.value = false;
      toast.success(res.data.message);

      let user = Functions.ReadSessionCustom("user");
      let now = new Date();

      user.email_verified_at = now;
      Functions.SaveSessionCustom("user", user);
      userStore.setCurrentUser(user);

      setTimeout(() => {
        router.push({ path: "/dashboard" });
      }, 3000);
      window.location.reload();
    })
    .catch((err) => {
      isBusy.value = false;
      console.log(err);
    });
};

const HandleGenerate = () => {
  isBusy.value = true;

  AuthService.GenerateOTP()
    .then((res) => {
      isBusy.value = false;
      toast.success(res.data.message);
    })
    .catch((err) => {
      isBusy.value = false;
      errMessage.value = err.response.data.error;
    });
};
</script>

<style lang="scss" scoped></style>
