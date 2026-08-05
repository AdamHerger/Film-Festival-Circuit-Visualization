function BuildGraph(films, runs, festivals) {
  const filmNodes = new Map();
  const festivalNodes = new Map();

  films.forEach((film) => {
    filmNodes.set(`film_${film["unique.id"]}`, {
      id: `film_${film["unique.id"]}`,
      type: "film",
      title: film["title.mixed"],
      year: +film["prod.year"],
      runtime: +film["length.min"],
      country: film["prod.country.1.en"],
      director: film["director.1"],
      genre: film["genre"],

      group: "film",
    });
  });

  festivals.forEach((festival) => {
    festivalNodes.set(festival["festival.id"], {
      id: festival["festival.id"],
      type: "festival",
      label: festival["fest.label"],
      city: festival["fest.location.city.en.1"],
      group: "festival",
    });
  });

  const links = [];

  runs.forEach((run) => {
    const source = `film_${run["unique.id"]}`;
    const target = run["festival.id"];

    if (!filmNodes.has(source) || !festivalNodes.has(target)) {
      return;
    }

    links.push({
      source,
      target,
      year: +run["event.year"],
      month: +run["event.month"],
    });
  });

  const connectedNodes = new Set();

  links.forEach((link) => {
    connectedNodes.add(link.source);
    connectedNodes.add(link.target);
  });

  return {
    nodes: [...filmNodes.values(), ...festivalNodes.values()].filter((node) =>
      connectedNodes.has(node.id),
    ),
    links,
  };
}

export default BuildGraph;
