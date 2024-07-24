import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Auth/LoginView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Auth/RegisterView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/",
    redirect: "/dashboard",
    name: "layout",
    component: () => import("@/views/LayoutView.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/DashboardView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/film",
        name: "film",
        component: () => import("@/views/FilmView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/cast",
        name: "cast",
        component: () => import("@/views/CastView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/genre",
        name: "genre",
        component: () => import("@/views/GenreView.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/verifikasi",
        name: "verifikasi",
        component: () => import("@/views/Auth/VerificationView.vue"),
        meta: {
          isVerified: true,
          requiresAuth: true,
        },
      },
    ],
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return next({
      path: "/login",
      query: { returnUrl: to.fullPath },
    });
  }

  if ((to.path === "/login" || to.path === "/register") && token) {
    return next({ path: "/dashboard" });
  }

  const { isVerified } = useUserStore();

  if (to.meta.isVerified && isVerified == true) {
    return next({ path: "/dashboard" });
  }

  next();
});

export default router;
