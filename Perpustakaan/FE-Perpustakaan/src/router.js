import { createRouter, createWebHistory } from "vue-router";
import Functions from "./tools/Functions";

import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";

import Public from "./components/public/Public.vue";
import PublicHome from "./components/public/PublicHome.vue";
import PublicBook from "./components/public/PublicBook.vue";
import PublicCategory from "./components/public/PublicCategory.vue";

import Dashboard from "./components/private/Dashboard.vue";
import Book from "./components/private/book/Book.vue";
import Bookdetail from "./components/private/book/Bookdetail.vue";
import Category from "./components/private/category/Category.vue";
import Role from "./components/private/role/Role.vue";
import CaetegoryDetail from "./components/private/category/CaetegoryDetail.vue";
import Borrow from "./components/private/borrow/Borrow.vue";
import BorrowDetail from "./components/private/borrow/BorrowDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
      name: "public",
      component: Public,
      children: [
        {
          path: "/home",
          name: "home",
          component: PublicHome,
        },
        {
          path: "/book",
          name: "book",
          component: PublicBook,
        },
        {
          path: "/category",
          name: "category",
          component: PublicCategory,
        },
      ],
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        onlyOwner: true,
      },
      children: [
        {
          path: "/dashboard/book",
          name: "dashboardBook",
          component: Book,
          meta: {
            onlyOwner: true,
          },
        },
        {
          path: "/dashboard/book/detail",
          name: "dashboardBookDetail",
          component: Bookdetail,
          meta: {
            onlyOwner: true,
          },
        },
        {
          path: "/dashboard/category",
          name: "dashboardCategory",
          component: Category,
          meta: {
            onlyOwner: true,
          },
        },
        {
          path: "/dashboard/category/detail",
          name: "dashboardCategoryDetail",
          component: CaetegoryDetail,
          meta: {
            onlyOwner: true,
          },
        },
        {
          path: "/dashboard/role",
          name: "dashboardRole",
          component: Role,
          meta: {
            onlyOwner: true,
          },
        },
        {
          path: "/dashboard/borrow",
          name: "dashboardBorrow",
          component: Borrow,
          meta: {
            onlyOwner: true,
          },
        },
        {
          path: "/dashboard/borrow/detail",
          name: "dashboardBorrowDetail",
          component: BorrowDetail,
          meta: {
            onlyOwner: true,
          },
        },
      ],
    },

    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
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

  const user = Functions.ReadSessionCustom("user");

  if (to.meta.onlyOwner && user.role !== "owner") {
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
