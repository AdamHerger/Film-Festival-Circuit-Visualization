function FilterFilms(graph, filters) {
  const filmNodes = graph.nodes.filter((node) => node.type === "film");

  const filteredFilms = filmNodes.filter((film) => {
    if (filters.documentaryOnly && !film.genre.includes("Documentary"))
      return false;
    if (filters.fictOnly && !film.genre.includes("Fiction")) return false;
    if (filters.expOnly && !film.genre.includes("Experimental")) return false;
    if (filters.animtOnly && !film.genre.includes("Animation")) return false;
    if (filters.lgbtqOnly && !film.genre.includes("LGBTQ+")) return false;

    if (filters.MENA && !film.region.includes("MENA")) return false;
    if (filters.africa && !film.region.includes("Africa")) return false;
    if (filters.asia && !film.region.includes("Asia")) return false;
    if (filters.na && !film.region.includes("North America")) return false;
    if (filters.eu && !film.region.includes("Europe")) return false;
    if (filters.la && !film.region.includes("Latin America")) return false;
    if (filters.ocean && !film.region.includes("Ocean")) return false;

    if (film.year < filters.minYear || film.year > filters.maxYear)
      return false;

    if (film.runtime < filters.minRuntime || film.runtime > filters.maxRuntime)
      return false;

    if (
      film.connections < filters.minConnections ||
      film.connections > filters.maxConnections
    )
      return false;

    if (film.rating < filters.minRating || film.rating > filters.maxRating)
      return false;

    // money filters
    if (filters.includeNA) {
      if (
        film.budget >= 0 &&
        (film.budget < filters.minBudget || film.budget > filters.maxBudget)
      )
        return false;
    } else {
      if (film.budget < filters.minBudget || film.budget > filters.maxBudget)
        return false;
    }

    if (filters.country.length > 0) {
      const hasAllSelectedCountries = filters.country.every((selectedCountry) =>
        film.country.some(
          (filmCountry) =>
            filmCountry.toLowerCase() === selectedCountry.toLowerCase(),
        ),
      );

      if (!hasAllSelectedCountries) return false;
    }

    if (filters.director.length > 0) {
      const hasAllSelectedDirectors = filters.director.every(
        (selectedDirector) =>
          film.director.some(
            (filmDirector) =>
              filmDirector.toLowerCase() === selectedDirector.toLowerCase(),
          ),
      );

      if (!hasAllSelectedDirectors) return false;
    }

    if (filters.awards.length > 0) {
      const hasAllSelectedAwards = filters.awards.every((selectedAward) =>
        film.awards.some(
          (filmAward) =>
            filmAward.toLowerCase() === selectedAward.toLowerCase(),
        ),
      );

      if (!hasAllSelectedAwards) return false;
    }

    if (filters.languages.length > 0) {
      const hasAllSelectedLanguages = filters.languages.every(
        (selectedLanguage) =>
          film.languages.some(
            (filmLanguage) =>
              filmLanguage.toLowerCase() === selectedLanguage.toLowerCase(),
          ),
      );

      if (!hasAllSelectedLanguages) return false;
    }

    if (filters.genres.length > 0) {
      const hasAllSelectedGenres = filters.genres.every((selectedGenre) =>
        film.genres.some(
          (filmGenre) =>
            filmGenre.toLowerCase() === selectedGenre.toLowerCase(),
        ),
      );

      if (!hasAllSelectedGenres) return false;
    }

    return true;
  });

  const filteredFilmIds = new Set(filteredFilms.map((film) => film.id));

  const filteredLinks = graph.links.filter((link) => {
    const sourceId =
      typeof link.source === "object" ? link.source.id : link.source;

    return filteredFilmIds.has(sourceId);
  });

  const connectedFestivalIds = new Set(
    filteredLinks.map((link) => {
      return typeof link.target === "object" ? link.target.id : link.target;
    }),
  );

  const filteredNodes = graph.nodes.filter((node) => {
    if (node.type === "film") {
      return filteredFilmIds.has(node.id);
    }

    if (node.type === "festival") {
      return connectedFestivalIds.has(node.id);
    }

    return false;
  });

  return {
    nodes: filteredNodes,
    links: filteredLinks,
  };
}

export default FilterFilms;
