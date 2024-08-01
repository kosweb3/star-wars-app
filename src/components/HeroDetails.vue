<template>
  <div>
    <loader v-if="loading" />
    <div v-else class="vue-flow-container">
      <h2>Selected heroe: {{ heroDetails?.name }}</h2>
      <vue-flow
        :nodes="nodes"
        :edges="edges"
        align="end"
        dots="dots"
        class="vue-flow__node-custom"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { VueFlow } from "@vue-flow/core";
import { useHeroStore } from "../store";
import { storeToRefs } from "pinia";
import { createGraph } from "../utils/graphHelper";
import loader from "@/components/loader.vue";

const route = useRoute();
const heroId = ref(route.params.id);
const nodes = ref([]);
const edges = ref([]);

// heroStore
const heroStore = useHeroStore();
const { fetchHeroDetails } = heroStore;
const { heroDetails, loading } = storeToRefs(heroStore);

const loadHeroDetails = async () => {
  await fetchHeroDetails(heroId.value);
  const graph = createGraph(heroDetails.value);
  nodes.value = graph.nodes;
  edges.value = graph.edges;
};

onMounted(() => {
  loadHeroDetails();
});
</script>
