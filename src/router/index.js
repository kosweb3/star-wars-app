import { createRouter, createWebHistory } from "vue-router";
import HeroList from "@/components/HeroList.vue";
import HeroDetails from "@/components/HeroDetails.vue";

const routes = [
  { path: "/star-wars-app", component: HeroList },
  { path: "/star-wars-app/hero/:id", component: HeroDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
