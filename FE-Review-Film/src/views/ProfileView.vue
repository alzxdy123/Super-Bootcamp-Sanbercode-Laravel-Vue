<template>
  <div class="w-full flex justify-center items-center mt-20">
    <Icon v-if="isBusy" icon="svg-spinners:180-ring-with-bg" class="text-5xl" />
    <div v-else>
      <div>
        <ProfileForm title="Create Profile" v-if="createProfileForm" />
        <ProfileForm
          title="Update Profile"
          v-else-if="updateProfileForm"
          @close="updateProfileForm = false"
          :profile="profile"
        />
        <div
          v-else
          class="w-80 flex flex-col justify-center items-center gap-10"
        >
          <div class="header">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
          </div>

          <div class="body">
            <div class="text-2xl font-bold">Name: {{ user.name }}</div>
            <div class="text-2xl font-bold">Email: {{ user.email }}</div>
            <div class="text-2xl font-bold">Age: {{ profile.age }}</div>
            <div class="text-2xl font-bold">Bio: {{ profile.bio }}</div>
            <div class="text-2xl font-bold">Address: {{ profile.address }}</div>
          </div>

          <div class="mt-10">
            <div
              class="py-2 px-5 rounded-md text-md bg-yellow-400 mt-5 text-centerf font-bold cursor-pointer"
              @click="EditProfile()"
            >
              Edit Profile
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import Functions from "@/tools/Functions";
import AuthService from "@/services/AuthService";
import ProfileForm from "@/components/ProfileForm.vue";

const isBusy = ref(true);
const profile = ref({});
const user = ref({});
const createProfileForm = ref(false);
const updateProfileForm = ref(false);

const GetUser = () => {
  isBusy.value = true;
  AuthService.Me()
    .then((res) => {
      isBusy.value = false;
      let data = res.data.data;
      user.value = data;

      if (data.profile !== null) {
        isBusy.value = false;
        profile.value = data.profile;
        createProfileForm.value = false;
      } else {
        createProfileForm.value = true;
      }
    })
    .catch((err) => {
      console.log(err);
      isBusy.value = false;
    });
};

const EditProfile = () => {
  updateProfileForm.value = true;
};

onMounted(() => {
  GetUser();
});
</script>

<style lang="scss" scoped></style>
