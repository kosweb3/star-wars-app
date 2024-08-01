export const createGraph = (hero) => {
  const nodes = [];
  const edges = [];

  // Adding general nodes of heroes
  const heroId = `hero-${hero.url
    .split("/star-wars-app/hero")
    .filter(Boolean)
    .pop()}`;
  nodes.push({
    id: heroId,
    data: { label: hero.name },
    position: { x: 0, y: 0 },
  });

  //   Adding films and links to them
  hero.films.forEach((film, filmIndex) => {
    const filmId = `film-${filmIndex}`;
    nodes.push({
      id: filmId,
      data: { label: `${film.title}` },
      position: { x: 200, y: filmIndex * 100 },
    });

    edges.push({
      id: `edge-${heroId}-${filmId}`,
      source: heroId,
      target: filmId,
    });

    // Adding starship and links to them
    film.starships.forEach((starship, starshipIndex) => {
      const starshipId = `starship-${starshipIndex}`;
      nodes.push({
        id: starshipId,
        data: { label: starship.name || `Starship ${starshipIndex + 1}` },
        position: { x: 400, y: starshipIndex * 100 },
      });

      edges.push({
        id: `edge-${filmId}-${starshipId}`,
        source: filmId,
        target: starshipId,
      });
    });
  });

  return { nodes, edges };
};
