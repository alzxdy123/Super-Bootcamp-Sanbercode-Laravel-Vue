<template>
  <div style="background-color: #f2f2f2">
    <div class="wrapper">
      <div class="background"></div>
      <form @submit.prevent="Login()" class="box">
        <div class="header">Login</div>
        <div class="body">
          <BFormGroup
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            class="form-group"
            :class="errorMessage.error ? 'has-error' : ''"
          >
            <BFormInput
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            />
            <div class="error" v-if="errorMessage.error">
              {{ errorMessage.error }}
            </div>
          </BFormGroup>
          <BFormGroup
            id="input-group-2"
            label="Password:"
            label-for="input-2"
            class="form-group"
            :class="errorMessage.error ? 'has-error' : ''"
          >
            <BFormInput
              id="input-2"
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              required
            />
          </BFormGroup>
          <div class="captcha-box">
            <div class="captcha">
              <span class="captcha-text">{{ captcha }} </span
              ><i class="jam jam-refresh" @click="ReCaptcha()"></i>
            </div>
            <BFormGroup
              class="form-group"
              :class="errorMessage.captcha ? 'has-error' : ''"
            >
              <BFormInput
                v-model="form.captcha"
                type="text"
                placeholder="Enter captcha"
                required
              />
              <div class="error" v-if="errorMessage.captcha">
                {{ errorMessage.captcha }}
              </div>
            </BFormGroup>
          </div>
        </div>
        <div class="footer">
          <button type="submit">
            <BSpinner small v-if="isBusy" />
            <span v-else>Login</span>
          </button>
          <p>
            Dont have an account?
            <RouterLink to="/register">Register</RouterLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import AuthService from "@/services/AuthService";
import Functions from "@/tools/Functions";
import { jwtDecode } from "jwt-decode";
import { ref, reactive, computed, onMounted } from "vue";

const form = reactive({
  email: "",
  password: "",
  captcha: "",
});

const captcha = ref("");
const errorMessage = reactive({
  error: "",
  captcha: "",
});
const isBusy = ref(false);

const Login = () => {
  isBusy.value = true;

  const reqBody = {
    email: form.email,
    password: form.password,
  };

  if (captcha.value === form.captcha) {
    errorMessage.captcha = null;
    isBusy.value = true;

    AuthService.Login(reqBody)
      .then((res) => {
        errorMessage.error = "";
        isBusy.value = false;
        Functions.SaveSessionCustom("token", res.data.token);

        const user = jwtDecode(res.data.token);

        const userData = {
          username: user.username,
          email: user.email,
          role: "user",
        };

        console.log(user.role_id);

        if (user.role == "owner") {
          userData.role = "owner";
        }

        Functions.SaveSessionCustom("user", userData);

        Functions.Notification("success", "Login", "Login Success");
        Functions.ToPage("/");
      })
      .catch((err) => {
        isBusy.value = false;
        errorMessage.error = err.response.data.message;
      });
  } else {
    errorMessage.captcha = "Captcha is not valid";
    isBusy.value = false;
  }
};

const ReCaptcha = () => {
  captcha.value = Functions.GenerateCaptcha(4);
};

onMounted(() => {
  captcha.value = Functions.GenerateCaptcha(4);
});
</script>

<style lang="scss">
@import "@/assets/scss/auth.scss";
</style>
