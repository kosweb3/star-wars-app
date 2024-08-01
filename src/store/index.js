import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const API_URL = "https://swapi.dev/api";

export const useHeroStore = defineStore("heroStore", () => {
  const heroes = ref([]);
  const heroDetails = ref(null);
  const page = ref(1);
  const hasMore = ref(true);
  const loading = ref(false);

  const fetchHeroes = async () => {
    loading.value = true;
    try {
      const response = await axios.get(`${API_URL}/people/?page=${page.value}`);
      heroes.value = response.data.results;
      hasMore.value = !!response.data.next;
    } catch (error) {
      console.error("Error fetching heroes:", error);
    } finally {
      loading.value = false;
    }
  };

  const fetchHeroDetails = async (id) => {
    loading.value = true;
    try {
      const heroResponse = await axios.get(`${API_URL}/people/${id}/`);
      const hero = heroResponse.data;

      const filmRequests = hero.films.map((url) => axios.get(url));
      const films = await Promise.all(filmRequests);

      const starshipUrls = films.flatMap((film) => film.data.starships);
      const starshipRequests = starshipUrls.map((url) => axios.get(url));
      const starships = await Promise.all(starshipRequests);

      const starshipDict = starships.reduce((acc, starship) => {
        acc[starship.data.url] = starship.data;
        return acc;
      }, {});

      const filmsWithStarships = films.map((filmResponse) => {
        const film = filmResponse.data;
        const starshipDetails = film.starships.map((url) => starshipDict[url]);
        return { ...film, starships: starshipDetails };
      });

      heroDetails.value = {
        ...hero,
        films: filmsWithStarships,
        starships: starships.map((s) => s.data),
      };
    } catch (error) {
      console.error("Error fetching hero details:", error);
    } finally {
      loading.value = false;
    }
  };

  const prevPage = () => {
    if (page.value > 1) {
      page.value--;
      fetchHeroes();
    }
  };

  const nextPage = () => {
    if (hasMore.value) {
      page.value++;
      fetchHeroes();
    }
  };

  return {
    heroes,
    heroDetails,
    page,
    hasMore,
    loading,
    fetchHeroes,
    fetchHeroDetails,
    prevPage,
    nextPage,
  };
});
