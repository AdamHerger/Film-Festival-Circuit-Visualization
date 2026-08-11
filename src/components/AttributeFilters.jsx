import CheckBoxFilter from "./CheckBoxFilter";
import RangeSliderFilter from "./RangeSliderFilter";
import InputBoxFilter from "./InputBoxFilter";
import DropdownFilter from "./DropdownFilter";
import { getUniqueOptions } from "./FilterOptions";

import { useMemo } from "react";

function AttributeFilters({ filters, setFilters, films }) {
  // stored attributes
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

  return (
    <div>
      <br />
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
    </div>
  );
}

export default AttributeFilters;
