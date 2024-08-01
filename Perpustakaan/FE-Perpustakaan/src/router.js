import { createRouter, createWebHistory } from "vue-router";

import LoginView from "./views/Auth/LoginView.vue";
import RegisterView from "./views/Auth/RegisterView.vue";

import UserLayout from "./views/User/UserLayout.vue";
import HomeView from "./views/User/HomeView.vue";
import Functions from "./tools/Functions";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      name: "user",
      component: UserLayout,
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
      ],
    },

    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);

  let token = localStorage.getItem("token");

  if (authRequired && token == null) {
    return next({
      path: "/login",
      query: {
        returnUrl: to.path,
      },
    });
  }

  if (token != null && to.path == "/login") {
    Functions.Notification("error", "Error", "Anda sudah login");
    return next({
      path: "/",
      query: {
        returnUrl: to.path,
      },
    });
  }

  next();
});

export default router;
