function FilterFilms(films, filters, awards) {
  const awardsByImdb = new Map();

  awards.forEach((award) => {
    const imdbId = award["imdb.id"];

    if (!awardsByImdb.has(imdbId)) {
      awardsByImdb.set(imdbId, []);
    }

    awardsByImdb.get(imdbId).push(award["award"]);
  });

  return films.filter((film) => {
    // categories
    if (filters.documentaryOnly && +film.doc !== 1) return false;
    if (filters.fictOnly && +film.fict !== 1) return false;
    if (filters.expOnly && +film.exp !== 1) return false;
    if (filters.animtOnly && +film.animt !== 1) return false;
    if (filters.lgbtqOnly && film["lgbtq"] !== "LGBT*Q films") return false;

    // regions
    if (filters.MENA && +film["regions.mena"] !== 1) return false;
    if (filters.africa && +film["regions.africa"] !== 1) return false;
    if (filters.asia && +film["regions.asia"] !== 1) return false;
    if (filters.na && +film["regions.na"] !== 1) return false;
    if (filters.eu && +film["regions.eu"] !== 1) return false;
    if (filters.la && +film["regions.la"] !== 1) return false;
    if (filters.ocean && +film["regions.ocean"] !== 1) return false;

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

    const filmAwards = awardsByImdb.get(film["imdb.id"]) || [];

    if (filters.awards.length > 0) {
      const hasAllSelectedAwards = filters.awards.every((selectedAward) =>
        filmAwards.some(
          (filmAward) =>
            filmAward.toLowerCase() === selectedAward.toLowerCase(),
        ),
      );

      if (!hasAllSelectedAwards) {
        return false;
      }
    }

    return true;
  });
}

export default FilterFilms;
