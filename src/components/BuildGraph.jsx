function BuildGraph(films, runs, festivals, awards, general) {
  const filmNodes = new Map();
  const festivalNodes = new Map();
  const awardsByImdb = new Map();
  const generalByImdb = new Map();
  const runInfoByImdb = new Map();

  awards.forEach((award) => {
    const imdbId = award["imdb.id"];

    if (!awardsByImdb.has(imdbId)) {
      awardsByImdb.set(imdbId, []);
    }

    awardsByImdb.get(imdbId).push({
      award: award["award"],
    });
  });

  runs.forEach((run) => {
    const imdbId = run["unique.id"];

    if (!runInfoByImdb.has(imdbId)) {
      runInfoByImdb.set(imdbId, {
        releaseTypes: new Set(),
        genderTeam: new Set(),
        connections: 0,
      });
    }
    const info = runInfoByImdb.get(imdbId);
    if (+run["thr"] === 1) info.releaseTypes.add("Theatrical");
    if (+run["digital"] === 1) info.releaseTypes.add("Digital");
    if (+run["tv"] === 1) info.releaseTypes.add("Television");
    if (+run["dvd"] === 1) info.releaseTypes.add("DVD");
    info.genderTeam.add(run["gender.team"]);
    info.connections += 1;
  });

  general.forEach((info) => {
    const imdbId = info["imdb.id"];

    if (!imdbId || imdbId === "NA") return;

    generalByImdb.set(imdbId, {
      languages: info["languages"],
      genres: info["genres"],
      rating: info["rating"],
      budget: info["budget"],
      openingusa: info["openingUSA"],
      grossusa: info["grossUSA"],
      grossworld: info["grossWorld"],
    });
  });

  films.forEach((film) => {
    const generalInfo = generalByImdb.get(film["imdb.id"]) || {};
    const runInfo = runInfoByImdb.get(film["unique.id"]) || {
      releaseTypes: new Set(),
      genderTeam: new Set(),
      connections: 0,
    };

    filmNodes.set(`film_${film["unique.id"]}`, {
      id: `film_${film["unique.id"]}`,
      type: "film",
      title: film["title.mixed"],
      year: +film["prod.year"],
      runtime: +film["length.min"],
      country: [
        film["prod.country.1.en"],
        film["prod.country.2.en"],
        film["prod.country.3.en"],
        film["prod.country.4.en"],
      ].filter((country) => country && country !== "NA"),
      region: [
        +film["regions.mena"] === 1 && "MENA",
        +film["regions.africa"] === 1 && "Africa",
        +film["regions.asia"] === 1 && "Asia",
        +film["regions.na"] === 1 && "North America",
        +film["regions.eu"] === 1 && "Europe",
        +film["regions.la"] === 1 && "Latin America",
        +film["regions.ocean"] === 1 && "Ocean",
      ].filter(Boolean),
      genre: [
        +film["doc"] === 1 && "Documentary",
        +film["fict"] === 1 && "Fiction",
        +film["exp"] === 1 && "Experimental",
        +film["animt"] === 1 && "Animation",
        film["lgbtq"] === "LGBT*Q films" && "LGBTQ+",
      ].filter(Boolean),
      director: Array.from(
        { length: 26 },
        (_, i) => film[`director.${i + 1}`],
      ).filter((director) => director && director !== "NA"),
      awards: [
        ...new Set(
          (awardsByImdb.get(film["imdb.id"]) || []).map((award) => award.award),
        ),
      ],
      languages: generalInfo.languages || "",
      genres: generalInfo.genres || "",
      rating: +generalInfo.rating || 0,
      budget: generalInfo.budget || "",
      openingusa: generalInfo.openingusa || "",
      grossusa: generalInfo.grossusa || "",
      grossworld: generalInfo.grossworld || "",

      releaseTypes: [...runInfo.releaseTypes],

      genderTeam: [...runInfo.genderTeam],

      connections: runInfo.connections,

      group: "film",
    });
  });

  festivals.forEach((festival) => {
    festivalNodes.set(festival["festival.id"], {
      id: festival["festival.id"],
      type: "festival",
      label: festival["fest.label"],
      country: [
        festival["fest.location.country.en.1.standrardized"],
        festival["fest.location.country.en.2.standrardized"],
        festival["fest.location.country.en.3.standrardized"],
        festival["fest.location.country.en.4.standrardized"],
        festival["fest.location.country.en.5.standrardized"],
      ].filter((country) => country && country !== "NA"),
      city: [
        festival["fest.location.city.en.1"],
        festival["fest.location.city.en.2"],
        festival["fest.location.city.en.3"],
        festival["fest.location.city.en.4"],
        festival["fest.location.city.en.5"],
      ].filter((city) => city && city !== "NA" && city !== "0" && city !== 0),
      group: "festival",
    });
  });

  const links = [];

  runs.forEach((run) => {
    const imdbId = run["unique.id"];
    const source = `film_${imdbId}`;
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
