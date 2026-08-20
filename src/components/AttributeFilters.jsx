import CheckBoxFilter from "./CheckBoxFilter";
import RangeSliderFilter from "./RangeSliderFilter";
import InputBoxFilter from "./InputBoxFilter";
import DropdownFilter from "./DropdownFilter";
import { getUniqueOptions } from "./FilterOptions";

import { useMemo } from "react";

function AttributeFilters({
  filters,
  setFilters,
  films,
  awards,
  general,
  runs,
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

  return (
    <div>
      <br />
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
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <RangeSliderFilter
              label="Production Year"
              minval={1900}
              maxval={2026}
              step={1}
              value1="minYear"
              value2="maxYear"
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
              minval={0}
              maxval={800}
              step={1}
              value1="minRuntime"
              value2="maxRuntime"
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
              minval={1}
              maxval={200}
              step={1}
              value1="minConnections"
              value2="maxConnections"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-box">
          <div className="filter-component">
            <RangeSliderFilter
              label="Rating"
              minval={0}
              maxval={10}
              step={0.1}
              value1="minRating"
              value2="maxRating"
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
        <br />
        <div className="filter-component">
          <InputBoxFilter
            label="Budget"
            value1="minBudget"
            value2="maxBudget"
            filters={filters}
            setFilters={setFilters}
          />
          <br />
          <div className="filter-component">
            <CheckBoxFilter
              label="Include NA Values"
              attribute="includeNA"
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
        </div>
      </div>
      <br />
      <div className="festival-filters">
        <p className="filter-label">ar</p>
      </div>
    </div>
  );
}

export default AttributeFilters;
