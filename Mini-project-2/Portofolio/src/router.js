import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomeView.vue";
import About from "./views/AboutView.vue";
import Projects from "./views/ProjectsView.vue";
import Skills from "./views/SkillsView.vue";
import IbbAdmin from "./views/project-detail/IbbAdmin.vue";
import IbbVA from "./views/project-detail/IbbVA.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/project",
      name: "project",
      component: Projects,
    },
    {
      path: "/project/ibb-admin",
      name: "ibbadmin",
      component: IbbAdmin,
    },
    {
      path: "/project/ibb-va",
      name: "ibbva",
      component: IbbVA,
    },
    {
      path: "/skill",
      name: "skill",
      component: Skills,
    },
  ],
});

export default router;
