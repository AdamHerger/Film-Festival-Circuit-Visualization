import CheckBoxFilter from "./CheckBoxFilter";
import RangeSliderFilter from "./RangeSliderFilter";
import InputBoxFilter from "./InputBoxFilter";
import DropdownFilter from "./DropdownFilter";
import IncludeNABox from "./IncludeNABox";
import ANDORBox from "./ANDORBox";
import { getUniqueOptions } from "./FilterOptions";

import { useMemo } from "react";

function AttributeFilters({
  filters,
  setFilters,
  films,
  festivals,
  awards,
  general,
  runs,
  graph,
}) {
  //stored attributes
  const countryOptions = useMemo(
    () =>
      getUniqueOptions(
        films,
        Array.from({ length: 7 }, (_, i) => `prod.country.${i + 1}.en`),
      ),
    [films],
  );

  const directorOptions = useMemo(
    () =>
      getUniqueOptions(
        films,
        Array.from({ length: 26 }, (_, i) => `director.${i + 1}`),
      ),
    [films],
  );

  const awardOptions = useMemo(
    () =>
      [
        ...new Set(
          awards
            .map((award) => award["award"])
            .filter((award) => award && award !== "NA"),
        ),
      ]
        .sort()
        .map((award) => ({
          value: award,
          label: award,
        })),
    [awards],
  );

  const languageOptions = useMemo(
    () =>
      [
        ...new Set(
          general
            .flatMap((film) =>
              typeof film.languages === "string" && film.languages !== "NA"
                ? film.languages.split(" | ")
                : [],
            )
            .map((language) => language.trim())
            .filter(Boolean),
        ),
      ].sort(),
    [general],
  );

  const genreOptions = useMemo(
    () =>
      [
        ...new Set(
          general
            .flatMap((film) =>
              typeof film.genres === "string" && film.genres !== "NA"
                ? film.genres.split(" | ")
                : [],
            )
            .map((genre) => genre.trim())
            .filter(Boolean),
        ),
      ].sort(),
    [general],
  );

  // festival options
  const festivalCountryOptions = useMemo(
    () =>
      getUniqueOptions(
        festivals,
        Array.from(
          { length: 4 },
          (_, i) => `fest.location.country.en.${i + 1}.standrardized`,
        ),
      ),
    [festivals],
  );

  const festivalCityOptions = useMemo(
    () =>
      getUniqueOptions(
        festivals,
        Array.from({ length: 4 }, (_, i) => `fest.location.city.en.${i + 1}`),
      ),
    [festivals],
  );

  const festivalCategoryOptions = [
    "LGBTQ+",
    "Women",
    "Black",
    "Jewish",
    "Asian",
    "Latino",
    "Other Identity",
    "Film Noir",
    "Genre",
    "Classics",
    "Underground",
    "Arthouse",
    "Independent",
    "Trash",
    "Science",
    "Historical",
    "War",
    "Crime",
    "Comedy",
    "Action",
    "Food & Wine",
    "Animation",
    "Archival",
    "Documentary",
    "Experimental",
    "Silent",
    "Children & Youth",
    "Up and Coming",
    "Debut",
    "Short Film",
    "Screenplay",
    "Video",
    "Disability",
    "Human Rights",
    "Indigenous",
    "Education",
    "Mental Health",
    "Student",
    "Diaspora",
    "Transnational",
    "National",
    "Region",
    "Online",
    "TV",
    "Series",
    "Random Fun Themes",
    "Porn / Erotic",
    "Ethnographic & Anthropological",
    "Environmental & Nature",
    "Fantasy / Horror / Thriller / Sci-Fi",
  ];

  const releaseTypes = ["Theatrical", "Digital", "Television", "DVD"];

  return (
    <div>
      <div className="film-filters">
        <p className="filter-label">Film Filters</p>
        <div className="filter-box">
          <div className="filter-component">
            <CheckBoxFilter
              label="Documentary"
              attribute="documentaryOnly"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Fiction"
              attribute="fictOnly"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Experimental"
              attribute="expOnly"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Animation"
              attribute="animtOnly"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="LGBTQ"
              attribute="lgbtqOnly"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-label">
            <ANDORBox
              attribute="genre"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <DropdownFilter
              label="Genres"
              value="genres"
              options={genreOptions}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-label">
            <ANDORBox
              attribute="genres"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <DropdownFilter
              label="Release Type"
              value="releaseTypes"
              options={releaseTypes}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-label">
            <ANDORBox
              attribute="releaseTypes"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <RangeSliderFilter
              label="Production Year"
              attribute="year"
              minval={1900}
              maxval={2026}
              step={1}
              value1="minYear"
              value2="maxYear"
              filters={filters}
              setFilters={setFilters}
              graph={graph}
            />
          </div>
          <br />
          <div className="filter-component">
            <IncludeNABox
              attribute="year"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <RangeSliderFilter
              label="Runtime"
              attribute="runtime"
              minval={0}
              maxval={800}
              step={1}
              value1="minRuntime"
              value2="maxRuntime"
              filters={filters}
              setFilters={setFilters}
              graph={graph}
            />
          </div>
          <br />
          <div className="filter-component">
            <IncludeNABox
              attribute="runtime"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <RangeSliderFilter
              label="Connections"
              attribute="connections"
              minval={1}
              maxval={150}
              step={1}
              value1="minConnections"
              value2="maxConnections"
              filters={filters}
              setFilters={setFilters}
              graph={graph}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <RangeSliderFilter
              label="Rating"
              attribute="rating"
              minval={0}
              maxval={10}
              step={0.1}
              value1="minRating"
              value2="maxRating"
              filters={filters}
              setFilters={setFilters}
              graph={graph}
            />
          </div>
          <br />
          <div className="filter-component">
            <IncludeNABox
              attribute="rating"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <DropdownFilter
              label="Production Country"
              value="country"
              options={countryOptions}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-label">
            <ANDORBox
              attribute="country"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>

        <br />

        <div className="filter-box">
          <div className="filter-component">
            <CheckBoxFilter
              label="North America"
              attribute="na"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Europe"
              attribute="eu"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Asia"
              attribute="asia"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Africa"
              attribute="africa"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Latin America"
              attribute="la"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Oceania"
              attribute="ocean"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="MENA"
              attribute="MENA"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-label">
            <ANDORBox
              attribute="region"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <DropdownFilter
              label="Languages"
              value="languages"
              options={languageOptions}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-label">
            <ANDORBox
              attribute="languages"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />

        <div className="filter-box">
          <div className="filter-component">
            <DropdownFilter
              label="Directors"
              value="director"
              options={directorOptions}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-label">
            <ANDORBox
              attribute="director"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <DropdownFilter
              label="Awards"
              value="awards"
              options={awardOptions}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-label">
            <ANDORBox
              attribute="awards"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <InputBoxFilter
              label="Budget"
              attribute="budget"
              value1="minBudget"
              value2="maxBudget"
              filters={filters}
              setFilters={setFilters}
              graph={graph}
            />
            <br />
            <div className="filter-component">
              <IncludeNABox
                attribute="budget"
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <InputBoxFilter
              label="Opening USA"
              attribute="openingusa"
              value1="minOpeningUSA"
              value2="maxOpeningUSA"
              filters={filters}
              setFilters={setFilters}
              graph={graph}
            />
            <br />
            <div className="filter-component">
              <IncludeNABox
                attribute="openingusa"
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <InputBoxFilter
              label="Gross USA"
              attribute="grossusa"
              value1="minGrossUSA"
              value2="maxGrossUSA"
              filters={filters}
              setFilters={setFilters}
              graph={graph}
            />
            <br />
            <div className="filter-component">
              <IncludeNABox
                attribute="grossusa"
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <InputBoxFilter
              label="Gross World"
              attribute="grossworld"
              value1="minGrossWorld"
              value2="maxGrossWorld"
              filters={filters}
              setFilters={setFilters}
              graph={graph}
            />
            <br />
            <div className="filter-component">
              <IncludeNABox
                attribute="grossworld"
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div className="festival-filters">
        <p className="filter-label">Festival Filters</p>
        <div className="filter-box">
          <div className="filter-component">
            <DropdownFilter
              label="Category"
              value="festivalCategory"
              options={festivalCategoryOptions}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-label">
            <ANDORBox
              attribute="festivalCategory"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <DropdownFilter
              label="Country"
              value="festivalCountry"
              options={festivalCountryOptions}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <DropdownFilter
              label="City"
              value="festivalCity"
              options={festivalCityOptions}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <CheckBoxFilter
              label="North America"
              attribute="Fna"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Europe"
              attribute="Feu"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Asia"
              attribute="Fasia"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Africa"
              attribute="Fafrica"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Latin America"
              attribute="Fla"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="Oceania"
              attribute="Focean"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="filter-component">
            <CheckBoxFilter
              label="MENA"
              attribute="FMENA"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <RangeSliderFilter
              label="Connections"
              attribute="festivalConnections"
              minval={1}
              maxval={2500}
              step={1}
              value1="minFestivalConnections"
              value2="maxFestivalConnections"
              filters={filters}
              setFilters={setFilters}
              graph={graph}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <RangeSliderFilter
              label="Founding Year"
              attribute="festivalYear"
              minval={1900}
              maxval={2026}
              step={1}
              value1="minFestivalYear"
              value2="maxFestivalYear"
              filters={filters}
              setFilters={setFilters}
              graph={graph}
            />
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

export default AttributeFilters;
