<template>
  <div>
    <h1 class="text-2xl font-bold mb-5 text-center">{{ title }}</h1>
    <form @submit.prevent="Profile()" class="w-full flex flex-col gap-5">
      <div>
        <input
          type="number"
          class="w-full rounded-md p-2 border border-slate-400"
          placeholder="Age"
          v-model="formData.age"
        />
        <p>{{ errMessage.age }}</p>
      </div>
      <div>
        <input
          type="text"
          class="w-full rounded-md p-2 border border-slate-400"
          placeholder="Bio"
          v-model="formData.bio"
        />
        <p>{{ errMessage.bio }}</p>
      </div>
      <div>
        <input
          type="text"
          class="w-full rounded-md p-2 border border-slate-400"
          placeholder="Address"
          v-model="formData.address"
        />
        <p>{{ errMessage.address }}</p>
      </div>
      <button
        type="submit"
        class="py-2 rounded-md text-md bg-yellow-400 w-full mt-5 flex justify-center items-center"
      >
        <Icon v-if="isBusy" icon="svg-spinners:180-ring-with-bg" />
        <span v-else>Save</span>
      </button>
    </form>
    <p
      class="text-center mt-5 cursor-pointer"
      @click="$emit('close')"
      v-if="title === 'Update Profile'"
    >
      Back
    </p>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import Functions from "@/tools/Functions";
import UserService from "@/services/UserService";

const props = defineProps({
  title: String,
  profile: Object,
});

const formData = reactive({
  age: "",
  bio: "",
  address: "",
});

const isBusy = ref(false);
const errMessage = reactive({});

const Profile = () => {
  const reqBody = {
    age: formData.age,
    bio: formData.bio,
    address: formData.address,
  };

  UserService.Profile(reqBody)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  if (props.profile) {
    console.log("🚀 ~ onMounted ~ props.profile:", props.profile);
    formData.age = props.profile.age;
    formData.bio = props.profile.bio;
    formData.address = props.profile.address;
  }
});
</script>

<style lang="scss" scoped></style>
