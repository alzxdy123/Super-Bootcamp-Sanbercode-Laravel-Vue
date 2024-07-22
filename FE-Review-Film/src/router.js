import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Auth/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Auth/RegisterView.vue"),
    },
    {
      path: "/",
      redirect: "/login", // Redirect root URL to /login
    },

    {
      path: "/layout",
      name: "layout",
      component: () => import("@/views/LayoutView.vue"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/views/DashboardView.vue"),
        },
        {
          path: "/film",
          name: "film",
          component: () => import("@/views/FilmView.vue"),
        },
        {
          path: "/cast",
          name: "cast",
          component: () => import("@/views/CastView.vue"),
        },
        {
          path: "/genre",
          name: "genre",
          component: () => import("@/views/GenreView.vue"),
        },
        {
          path: "/verifikasi",
          name: "verifikasi",
          component: () => import("@/views/Auth/VerificationView.vue"),
        },
      ],
    },
  ],
});

export default router;
