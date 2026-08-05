function FilterFilms(films, filters) {
  return films.filter((film) => {
    if (filters.documentaryOnly && +film.doc !== 1) return false;

    const year = +film["prod.year"];

    if (year < filters.minYear || year > filters.maxYear) return false;

    if (
      +film["length.min"] < filters.minRuntime ||
      +film["length.min"] > filters.maxRuntime
    )
      return false;

    return true;
  });
}

export default FilterFilms;
