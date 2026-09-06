import DropdownFilter from "./DropdownFilter";
import CalculateCompositeScore from "./CalculateCompositeScore";
function FilterFilms(graph, filters) {
  const filmNodes = graph.nodes.filter((node) => node.type === "film");
  const festivalNodes = graph.nodes.filter((node) => node.type === "festival");

  const rangeFilters = [
    ["year", "minYear", "maxYear"],
    ["runtime", "minRuntime", "maxRuntime"],
    ["connections", "minConnections", "maxConnections"],
    ["rating", "minRating", "maxRating"],
  ];

  const moneyFilters = [
    ["budget", "minBudget", "maxBudget"],
    ["openingusa", "minOpeningUSA", "maxOpeningUSA"],
    ["grossusa", "minGrossUSA", "maxGrossUSA"],
    ["grossworld", "minGrossWorld", "maxGrossWorld"],
  ];

  const dropDownFilters = [
    ["country"],
    ["director"],
    ["awards"],
    ["languages"],
    ["genres"],
    ["releaseTypes"],
  ];

  const singleGenreFilters = [
    ["documentaryOnly", "Documentary"],
    ["fictOnly", "Fiction"],
    ["expOnly", "Experimental"],
    ["animtOnly", "Animation"],
    ["lgbtqOnly", "LGBTQ+"],
  ];
  const activeGenreFilters = singleGenreFilters.filter(
    ([filterKey]) => filters[filterKey],
  );
  const isGenreAND = filters.ANDOR.get("genre") ?? true;

  const singleRegionFilters = [
    ["MENA", "MENA"],
    ["africa", "Africa"],
    ["asia", "Asia"],
    ["na", "North America"],
    ["eu", "Europe"],
    ["la", "Latin America"],
    ["ocean", "Ocean"],
  ];
  const activeRegionFilters = singleRegionFilters.filter(
    ([filterKey]) => filters[filterKey],
  );
  const isRegionAND = filters.ANDOR.get("region") ?? false;

  function evaluateANDORlogic(nodes, activeFilters, isAND) {
    if (activeFilters.length === 0) return true;
    if (isAND) {
      return activeFilters.every(([_, title]) => nodes.includes(title));
    } else {
      return activeFilters.some(([_, title]) => nodes.includes(title));
    }
  }

  function evaluateDropdownANDORlogic(nodes, selectedFilters, isAND) {
    if (!selectedFilters || selectedFilters.length === 0) return true;

    const targetValues = (Array.isArray(nodes) ? nodes : [nodes])
      .filter(Boolean)
      .map((val) => String(val).toLocaleLowerCase());

    if (isAND) {
      return selectedFilters.every((selected) =>
        targetValues.some((element) => element === selected.toLowerCase()),
      );
    } else {
      return selectedFilters.some((selected) =>
        targetValues.some((element) => element === selected.toLowerCase()),
      );
    }
  }

  const filteredFilms = filmNodes.filter((film) => {
    if (
      !evaluateANDORlogic(film.region || [], activeRegionFilters, isRegionAND)
    )
      return false;

    if (!evaluateANDORlogic(film.genre || [], activeGenreFilters, isGenreAND))
      return false;

    for (const [attribute, min, max] of rangeFilters) {
      const value = film[attribute];
      const includeNA = filters.includeNA.get(attribute) ?? true;

      if (value < 0 || isNaN(value) || value === null) {
        if (!includeNA) return false;
        continue;
      }

      if (film[attribute] < filters[min] || film[attribute] > filters[max])
        return false;
    }

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

    for (const [attribute] of dropDownFilters) {
      const selectedValues = filters[attribute];
      const isAND = filters.ANDOR.get(attribute) ?? true;

      if (
        !evaluateDropdownANDORlogic(
          film[attribute] || [],
          selectedValues,
          isAND,
        )
      ) {
        return false;
      }
    }

    // composite score calc stuff
    const compositeScore = CalculateCompositeScore(film, filters);
    if (
      filters.isCompositeScoreActive &&
      (compositeScore < (filters.minCompositeScore ?? 0) ||
        compositeScore > (filters.maxCompositeScore ?? 100))
    ) {
      return false;
    }

    return true;
  });

  const festivalDropDownFilters = [["festivalCountry"], ["festivalCity"]];
  const festivalArrayDropDownFilters = [["festivalCategory"]];
  const festivalSingleFilters = [
    ["FMENA", "MENA"],
    ["Fafrica", "Subsaharan Africa"],
    ["Fasia", "Asia"],
    ["Fna", "North America"],
    ["Feu", "Europe"],
    ["Fla", "Latin America and Caribbean"],
    ["Focean", "Oceania"],
  ];
  const activeFestivalRegionFilters = festivalSingleFilters.filter(
    ([filterKey]) => filters[filterKey],
  );

  const festivalRangeFilters = [
    ["festivalConnections", "minFestivalConnections", "maxFestivalConnections"],
    ["festivalYear", "minFestivalYear", "maxFestivalYear"],
  ];

  const filteredFestivals = festivalNodes.filter((festival) => {
    for (const [attribute, min, max] of festivalRangeFilters) {
      if (
        festival[attribute] < filters[min] ||
        festival[attribute] > filters[max]
      )
        return false;
    }

    for (const [attribute] of festivalDropDownFilters) {
      const selectedValues = filters[attribute];
      if (selectedValues && selectedValues.length > 0) {
        const val = festival[attribute];
        const matches = selectedValues.some(
          (sel) =>
            String(sel).toLowerCase() === String(val || "").toLowerCase(),
        );
        if (!matches) return false;
      }
    }

    for (const [attribute] of festivalArrayDropDownFilters) {
      const selectedValues = filters[attribute];
      const isAND = filters.ANDOR?.get?.(attribute) ?? true;
      if (
        !evaluateDropdownANDORlogic(
          festival[attribute] || [],
          selectedValues,
          isAND,
        )
      ) {
        return false;
      }
    }

    if (activeFestivalRegionFilters.length > 0) {
      const festivalReg = String(festival.festivalRegion || "").toLowerCase();
      const matchesRegion = activeFestivalRegionFilters.some(
        ([_, title]) => festivalReg === title.toLowerCase(),
      );
      if (!matchesRegion) return false;
    }

    return true;
  });

  const filteredFilmIds = new Set(filteredFilms.map((film) => film.id));
  const filteredFestivalIds = new Set(
    filteredFestivals.map((festival) => festival.id),
  );

  const filteredLinks = graph.links.filter((link) => {
    const sourceId =
      typeof link.source === "object" ? link.source.id : link.source;
    const targetId =
      typeof link.target === "object" ? link.target.id : link.target;

    return filteredFilmIds.has(sourceId) && filteredFestivalIds.has(targetId);
  });

  const activeFilmIds = new Set();
  const activeFestivalIds = new Set();

  filteredLinks.forEach((link) => {
    activeFilmIds.add(
      typeof link.source === "object" ? link.source.id : link.source,
    );
    activeFestivalIds.add(
      typeof link.target === "object" ? link.target.id : link.target,
    );
  });

  const filteredNodes = [
    ...filmNodes.filter((f) => activeFilmIds.has(f.id)),
    ...festivalNodes.filter((f) => activeFestivalIds.has(f.id)),
  ];

  return {
    nodes: filteredNodes,
    links: filteredLinks,
  };
}

export default FilterFilms;
