import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/HomeView.vue";
import About from "./views/AboutView.vue";
import Projects from "./views/ProjectsView.vue";
import Skills from "./views/SkillsView.vue";

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
      path: "/skill",
      name: "skill",
      component: Skills,
    },
  ],
});

export default router;
