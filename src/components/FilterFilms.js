function FilterFilms(graph, filters) {
  const filmNodes = graph.nodes.filter((node) => node.type === "film");

  const filteredFilms = filmNodes.filter((film) => {
    const singleFilters = [
      ["documentaryOnly", "Documentary", "genre"],
      ["fictOnly", "Fiction", "genre"],
      ["expOnly", "Experimental", "genre"],
      ["animtOnly", "Animation", "genre"],
      ["lgbtqOnly", "LGBTQ+", "genre"],
      ["MENA", "MENA", "region"],
      ["africa", "Africa", "region"],
      ["asia", "Asia", "region"],
      ["na", "North America", "region"],
      ["eu", "Europe", "region"],
      ["la", "Latin America", "region"],
      ["ocean", "Ocean", "region"],
    ];

    for (const [filter, title, type] of singleFilters) {
      if (filters[filter] && !film[type].includes(title)) return false;
    }

    const rangeFilters = [
      ["year", "minYear", "maxYear"],
      ["runtime", "minRuntime", "maxRuntime"],
      ["connections", "minConnections", "maxConnections"],
      ["rating", "minRating", "maxRating"],
    ];

    for (const [attribute, min, max] of rangeFilters) {
      if (film[attribute] < filters[min] || film[attribute] > filters[max])
        return false;
    }

    const moneyFilters = [
      ["budget", "minBudget", "maxBudget"],
      ["openingusa", "minOpeningUSA", "maxOpeningUSA"],
      ["grossusa", "minGrossUSA", "maxGrossUSA"],
      ["grossworld", "minGrossWorld", "maxGrossWorld"],
    ];

    for (const [attribute, minFilter, maxFilter] of moneyFilters) {
      const value = film[attribute];
      const includeNA = filters.includeNA.get(attribute) ?? true;

      if (value < 0) {
        if (!includeNA) return false;
        continue;
      }

      if (value < filters[minFilter] || value > filters[maxFilter]) {
        return false;
      }
    }

    const dropDownFilters = [
      ["country"],
      ["director"],
      ["awards"],
      ["languages"],
      ["genres"],
    ];

    for (const [attribute] of dropDownFilters) {
      if (filters[attribute].length > 0) {
        const hasAllSelected = filters[attribute].every((selected) =>
          film[attribute].some(
            (element) => element.toLowerCase() === selected.toLowerCase(),
          ),
        );

        if (!hasAllSelected) return false;
      }
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
