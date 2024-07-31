<template>
  <div>
    <div v-if="loading" class="loader">Loading...</div>
    <div class="vue-flow-container">
      <vue-flow
        :nodes="nodes"
        :edges="edges"
        dots="dots"
        class="vue-flow__node-custom"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchHeroDetails } from "../services/api";
import { createGraph } from "../utils/graphHelper";
import { VueFlow } from "@vue-flow/core";

const route = useRoute();
const heroId = ref(route.params.id);
const nodes = ref([]);
const edges = ref([]);
const loading = ref(true); // Стан завантаження

const loadHeroDetails = async () => {
  try {
    const hero = await fetchHeroDetails(heroId.value);
    // console.log("Hero Data:", hero); // Додаємо перевірку даних героя

    const graph = createGraph(hero);

    nodes.value = graph.nodes;
    edges.value = graph.edges;
  } catch (error) {
    console.error("Error loading hero details:", error);
  } finally {
    loading.value = false; // Завершити завантаження
  }
};

onMounted(() => {
  loadHeroDetails();
});
</script>

<style></style>
