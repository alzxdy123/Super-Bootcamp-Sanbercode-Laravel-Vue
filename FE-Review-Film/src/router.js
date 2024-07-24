import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Auth/LoginView.vue"),
    meta: { notLogin: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Auth/RegisterView.vue"),
    meta: { notLogin: true },
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
        // meta: { requiresAuth: true },
      },
      {
        path: "/film",
        name: "film",
        component: () => import("@/views/FilmView.vue"),
        // meta: { requiresAuth: true },
      },
      {
        path: "/cast",
        name: "cast",
        component: () => import("@/views/CastView.vue"),
        // meta: { requiresAuth: true },
      },
      {
        path: "/genre",
        name: "genre",
        component: () => import("@/views/GenreView.vue"),
        // meta: { requiresAuth: true },
      },
      {
        path: "/verifikasi",
        name: "verifikasi",
        component: () => import("@/views/Auth/VerificationView.vue"),
        meta: {
          isVerified: true,
        },
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/ProfileView.vue"),
        meta: { requiresAuth: true, notVerified: true },
      },
    ],
    // meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.notLogin && token) {
    return next({ path: "/dashboard" });
  }

  if (to.meta.requiresAuth && !token) {
    return next({
      path: "/dashboard",
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

  if (to.meta.notVerified && isVerified == false) {
    return next({ path: "/verifikasi" });
  }

  next();
});

export default router;

// {
//   path: "/:pathMatch(.*)*",
//   name: "notfound",
//   component: () => import("@/views/NotFoundView.vue"),
// },
