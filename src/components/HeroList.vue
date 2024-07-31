<template>
  <div class="hero-list-container">
    <div v-if="loading">Loding...</div>
    <div v-else>
      <ul>
        <li
          v-for="hero in heroes"
          :key="hero.url"
          @click="selectHero(hero.url)"
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { fetchHeroes } from "../services/api";

const heroes = ref([]);
const page = ref(1);
const hasMore = ref(true);
const loading = ref(true);
const router = useRouter();

const loadHeroes = async () => {
  const data = await fetchHeroes(page.value);
  if (data) {
    loading.value = false;
    heroes.value = data.results;
    hasMore.value = !!data.next; // Перевірка наявності наступної сторінки
  }
};

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    loadHeroes();
  }
};

const nextPage = () => {
  loading.value = true;
  if (hasMore.value) {
    loading.value = false;
    page.value++;
    loadHeroes();
  }
};

const selectHero = (url) => {
  const id = url.split("/").filter(Boolean).pop(); // Отримання ID з URL
  router.push(`/star-wars-app/hero/${id}`);
};

onMounted(() => {
  loadHeroes();
});
</script>

<style></style>
