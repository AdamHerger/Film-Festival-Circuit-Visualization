function FilterFilms(films, filters) {
  return films.filter((film) => {
    if (filters.documentaryOnly && +film.doc !== 1) return false;
    if (filters.fictOnly && +film.fict !== 1) return false;
    if (filters.expOnly && +film.exp !== 1) return false;
    if (filters.animtOnly && +film.animt !== 1) return false;
    if (filters.lgbtqOnly && film["lgbtq"] !== "LGBT*Q films") return false;

    const year = +film["prod.year"];

    if (year < filters.minYear || year > filters.maxYear) return false;

    if (
      +film["length.min"] < filters.minRuntime ||
      +film["length.min"] > filters.maxRuntime
    )
      return false;

    // country filter
    const filmCountries = Array.from(
      { length: 7 },
      (_, i) => film[`prod.country.${i + 1}.en`],
    ).filter((country) => country && country !== "NA");

    if (filters.country.length > 0) {
      const hasAllSelectedCountries = filters.country.every((selectedCountry) =>
        filmCountries.some(
          (filmCountry) =>
            filmCountry.toLowerCase() === selectedCountry.toLowerCase(),
        ),
      );

      if (!hasAllSelectedCountries) {
        return false;
      }
    }

    // director filter
    const filmDirectors = Array.from(
      { length: 26 },
      (_, i) => film[`director.${i + 1}`],
    ).filter((director) => director && director !== "NA");

    if (filters.director.length > 0) {
      const hasAllSelectedDirectors = filters.director.every(
        (selectedDirector) =>
          filmDirectors.some(
            (filmDirector) =>
              filmDirector.toLowerCase() === selectedDirector.toLowerCase(),
          ),
      );

      if (!hasAllSelectedDirectors) {
        return false;
      }
    }

    return true;
  });
}

export default FilterFilms;
