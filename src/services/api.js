import axios from "axios";

const API_URL = "https://swapi.dev/api";

export const fetchHeroes = async (page = 1) => {
  const response = await axios.get(`${API_URL}/people/?page=${page}`);
  return response.data;
};

export const fetchHeroDetails = async (id) => {
  const heroResponse = await axios.get(`${API_URL}/people/${id}/`);
  const hero = heroResponse.data;

  // Отримання фільмів для героя
  const filmRequests = hero.films.map((url) => axios.get(url));
  const films = await Promise.all(filmRequests);

  // Отримання космічних кораблів для кожного фільму
  const starshipUrls = films.flatMap((film) => film.data.starships);
  const starshipRequests = starshipUrls.map((url) => axios.get(url));
  const starships = await Promise.all(starshipRequests);

  // Створення словника для космічних кораблів для швидкого доступу
  const starshipDict = starships.reduce((acc, starship) => {
    acc[starship.data.url] = starship.data;
    return acc;
  }, {});

  // Оновлення фільмів з деталями космічних кораблів
  const filmsWithStarships = films.map((filmResponse) => {
    const film = filmResponse.data;
    const starshipDetails = film.starships.map((url) => starshipDict[url]);
    return { ...film, starships: starshipDetails };
  });

  return {
    ...hero,
    films: filmsWithStarships,
    starships: starships.map((s) => s.data),
  };
};
