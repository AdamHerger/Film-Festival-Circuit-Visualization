import CurrencyConverter from "./currencyConverter";
function BuildGraph(films, runs, festivals, awards, general) {
  const filmNodes = new Map();
  const festivalNodes = new Map();
  const awardsByImdb = new Map();
  const generalByImdb = new Map();
  const runInfoByImdb = new Map();
  const festivalConnectionsByFestivalId = new Map();

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
    const festId = run["festival.id"];

    festivalConnectionsByFestivalId.set(
      festId,
      (festivalConnectionsByFestivalId.get(festId) || 0) + 1,
    );

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
      languages: generalInfo.languages
        ? generalInfo.languages.split(" | ")
        : ["NA"],
      genres: generalInfo.genres ? generalInfo.genres.split(" | ") : ["NA"],
      rating: +generalInfo.rating || 0,

      budget: CurrencyConverter(generalInfo.budget),
      openingusa: CurrencyConverter(generalInfo.openingusa),
      grossusa: CurrencyConverter(generalInfo.grossusa),
      grossworld: CurrencyConverter(generalInfo.grossworld),

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
      festivalYear:
        festival["found.year"] !== "NA" && festival["found.year"]
          ? +festival["found.year"]
          : 0,
      festivalCountry: [
        festival["fest.location.country.en.1.standrardized"],
        festival["fest.location.country.en.2.standrardized"],
        festival["fest.location.country.en.3.standrardized"],
        festival["fest.location.country.en.4.standrardized"],
        festival["fest.location.country.en.5.standrardized"],
      ].filter((country) => country && country !== "NA"),
      festivalCity: [
        festival["fest.location.city.en.1"],
        festival["fest.location.city.en.2"],
        festival["fest.location.city.en.3"],
        festival["fest.location.city.en.4"],
        festival["fest.location.city.en.5"],
      ].filter((city) => city && city !== "NA" && city !== "0" && city !== 0),
      festivalRegion: festival["event.country.region"],
      festivalCategory: [
        +festival["festival.lgbtq"] === 1 && "LGBTQ+",
        +festival["festival.women"] === 1 && "Women",
        +festival["festival.black"] === 1 && "Black",
        +festival["festival.jewish"] === 1 && "Jewish",
        +festival["festival.asian"] === 1 && "Asian",
        +festival["festival.latino"] === 1 && "Latino",
        +festival["festival.other.identity"] === 1 && "Other Identity",
        +festival["festival.film.noir"] === 1 && "Film Noir",
        +festival["festival.genre"] === 1 && "Genre",
        +festival["festival.classics"] === 1 && "Classics",
        +festival["festival.underground"] === 1 && "Underground",
        +festival["festival.arthouse"] === 1 && "Arthouse",
        +festival["festival.independent"] === 1 && "Independent",
        +festival["festival.trash"] === 1 && "Trash",
        +festival["festival.science"] === 1 && "Science",
        +festival["festival.historical"] === 1 && "Historical",
        +festival["festival.war"] === 1 && "War",
        +festival["festival.crime"] === 1 && "Crime",
        +festival["festival.comedy"] === 1 && "Comedy",
        +festival["festival.action"] === 1 && "Action",
        +festival["festival.food.wine"] === 1 && "Food & Wine",
        +festival["festival.animation"] === 1 && "Animation",
        +festival["festival.archival"] === 1 && "Archival",
        +festival["festival.documentary"] === 1 && "Documentary",
        +festival["festival.experimental"] === 1 && "Experimental",
        +festival["festival.silent"] === 1 && "Silent",
        +festival["festival.children.youth"] === 1 && "Children & Youth",
        +festival["festival.up.and.coming"] === 1 && "Up and Coming",
        +festival["festival.debut"] === 1 && "Debut",
        +festival["festival.short.film"] === 1 && "Short Film",
        +festival["festival.screenplay"] === 1 && "Screenplay",
        +festival["festival.video"] === 1 && "Video",
        +festival["festival.disability"] === 1 && "Disability",
        +festival["festival.human.rights"] === 1 && "Human Rights",
        +festival["festival.indigenous"] === 1 && "Indigenous",
        +festival["festival.education.genre"] === 1 && "Education",
        +festival["festival.mental.health"] === 1 && "Mental Health",
        +festival["festival.student"] === 1 && "Student",
        +festival["festival.diaspora"] === 1 && "Diaspora",
        +festival["festival.transnational"] === 1 && "Transnational",
        +festival["festival.national"] === 1 && "National",
        +festival["festival.region"] === 1 && "Region",
        +festival["festival.online"] === 1 && "Online",
        +festival["festival.tv"] === 1 && "TV",
        +festival["festival.series"] === 1 && "Series",
        +festival["festival.random.fun.themes"] === 1 && "Random Fun Themes",
        +festival["festival.porn.erotic"] === 1 && "Porn / Erotic",
        +festival["festival.ethnographic.anthropological"] === 1 &&
          "Ethnographic & Anthropological",
        +festival["festival.environmental.nature"] === 1 &&
          "Environmental & Nature",
        +festival["festival.fantasy.horror.thriller.scifi"] === 1 &&
          "Fantasy / Horror / Thriller / Sci-Fi",
      ].filter(Boolean),
      festivalConnections:
        festivalConnectionsByFestivalId.get(festival["festival.id"]) || 0,
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
