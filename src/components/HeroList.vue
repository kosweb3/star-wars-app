<template>
  <div class="hero-list__container">
    <loader v-if="loading" />
    <div v-else>
      <h2>Select your heroe:</h2>

      <ul class="hero-list__items">
        <li
          v-for="hero in heroes"
          :key="hero.url"
          @click="selectHero(hero.url)"
          class="hero-list__item"
        >
          {{ hero.name }}
        </li>
      </ul>
      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">Prev</button>
        <span>Page {{ page }}</span>
        <button @click="nextPage" :disabled="!hasMore">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useHeroStore } from "../store";
import { storeToRefs } from "pinia";
import loader from "@/components/loader.vue";

const router = useRouter();

// heroStore
const heroStore = useHeroStore();
const { fetchHeroes, prevPage, nextPage } = heroStore;
const { heroes, page, hasMore, loading } = storeToRefs(heroStore);

const selectHero = (url) => {
  const id = url.split("/").filter(Boolean).pop(); // GET ID from URL
  router.push(`/star-wars-app/hero/${id}`);
};

onMounted(() => {
  fetchHeroes();
});
</script>
