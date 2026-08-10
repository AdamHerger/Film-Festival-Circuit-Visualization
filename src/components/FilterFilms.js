function FilterFilms(films, filters) {
  return films.filter((film) => {
    if (filters.documentaryOnly && +film.doc !== 1) return false;
    if (filters.fictOnly && +film.fict !== 1) return false;
    if (filters.expOnly && +film.exp !== 1) return false;
    if (filters.animtOnly && +film.animt !== 1) return false;
    if (filters.lgbtqOnly && +film.lgbtq === "other films") return false;

    const year = +film["prod.year"];

    if (year < filters.minYear || year > filters.maxYear) return false;

    if (
      +film["length.min"] < filters.minRuntime ||
      +film["length.min"] > filters.maxRuntime
    )
      return false;

    const [c1, c2, c3, c4] = [
      film["prod.country.1.en"],
      film["prod.country.2.en"],
      film["prod.country.3.en"],
      film["prod.country.4.en"],
    ];
    if (
      filters.country !== "" &&
      ![c1, c2, c3, c4]
        .filter(Boolean)
        .some(
          (country) => country.toLowerCase() === filters.country.toLowerCase(),
        )
    )
      return false;

    return true;
  });
}

export default FilterFilms;
