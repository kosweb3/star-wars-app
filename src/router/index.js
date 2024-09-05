import { createRouter, createWebHashHistory } from "vue-router";
import HeroList from "@/components/HeroList.vue";
import HeroDetails from "@/components/HeroDetails.vue";

const routes = [
  { path: "/", component: HeroList },
  { path: "/hero/:id", component: HeroDetails },
];

const router = createRouter({
  history: createWebHashHistory("/star-wars-app/"),
  routes,
});

export default router;
