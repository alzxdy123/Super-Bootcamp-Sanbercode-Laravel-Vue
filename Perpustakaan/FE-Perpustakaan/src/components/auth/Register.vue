<template>
  <div class="wrapper">
    <form class="box" @submit.prevent="Register()">
      <div class="header mt-3">Register</div>
      <div class="body">
        <BFormGroup
          label="Username:"
          label-for="username"
          class="form-group"
          :class="errorMessage.username ? 'has-error' : ''"
        >
          <BFormInput
            id="username"
            v-model="form.username"
            type="text"
            placeholder="Enter username"
            required
          />
          <div class="error" v-if="errorMessage.username">
            {{ Functions.ErrorMessage(errorMessage.username) }}
          </div>
        </BFormGroup>
        <BFormGroup
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          class="form-group"
          :class="errorMessage.email ? 'has-error' : ''"
        >
          <BFormInput
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          />
          <div class="error" v-if="errorMessage.email">
            {{ Functions.ErrorMessage(errorMessage.email) }}
          </div>
        </BFormGroup>
        <BFormGroup
          id="input-group-2"
          label="Password:"
          label-for="input-2"
          class="form-group"
          :class="errorMessage.password ? 'has-error' : ''"
        >
          <BFormInput
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            required
          />
          <div class="error" v-if="errorMessage.password">
            {{ Functions.ErrorMessage(errorMessage.password) }}
          </div>
        </BFormGroup>
        <BFormGroup
          label="Password Confirmation:"
          label-for="password_confirmation"
          class="form-group"
          :class="errorMessage.password_confirmation ? 'has-error' : ''"
        >
          <BFormInput
            id="password_confirmation"
            v-model="form.password_confirmation"
            type="password"
            placeholder="Password Confirmation"
            required
          />
          <div class="error" v-if="errorMessage.password_confirmation">
            {{ Functions.ErrorMessage(errorMessage.password_confirmation) }}
          </div>
        </BFormGroup>
      </div>
      <div class="footer">
        <button type="submit">
          <BSpinner small v-if="isBusy" />
          <span v-else>Sign Up</span>
        </button>
        <p>
          Back to
          <RouterLink to="/login">Login</RouterLink>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import AuthService from "@/services/AuthService";
import Functions from "@/tools/Functions";
import { reactive, ref } from "vue";

const form = reactive({
  username: "test",
  email: "test@gmail.com",
  password: "test",
  password_confirmation: "test2",
});

const isBusy = ref(false);
const errorMessage = ref("");

const Register = () => {
  isBusy.value = true;

  const reqBody = {
    username: form.username,
    email: form.email,
    password: form.password,
    password_confirmation: form.password_confirmation,
  };

  AuthService.Register(reqBody)
    .then((res) => {
      isBusy.value = false;
      errorMessage.value = {};

      console.log(res);
      Functions.Notification("success", "Register", "Register Success");
      Functions.ToPage("/login");
    })
    .catch((err) => {
      isBusy.value = false;

      errorMessage.value = err.response.data.errors;
      Functions.Notification("error", "Register", err.response.data.message);
    });
};
</script>

<style lang="scss">
@import "../../assets/scss/auth.scss";
</style>
