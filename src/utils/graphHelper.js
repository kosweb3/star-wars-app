export const createGraph = (hero) => {
  const nodes = [];
  const edges = [];
  const addedStarships = new Set(); // Set to track added starships

  // Adding general nodes of heroes
  const heroId = `hero-${hero.url.split("/").filter(Boolean).pop()}`;
  nodes.push({
    id: heroId,
    data: { label: hero.name },
    position: { x: 0, y: 0 },
  });

  // Adding films and links to them
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
      const starshipId = starship.url.split("/").filter(Boolean).pop();

      // Check if the starship has already been added
      if (!addedStarships.has(starshipId)) {
        nodes.push({
          id: starshipId,
          data: { label: starship.name || `Starship ${starshipIndex + 1}` },
          position: { x: 400, y: filmIndex * 100 + starshipIndex * 50 },
        });

        addedStarships.add(starshipId); // Add the starship to the set
      }

      edges.push({
        id: `edge-${filmId}-${starshipId}`,
        source: filmId,
        target: starshipId,
      });
    });
  });

  return { nodes, edges };
};
