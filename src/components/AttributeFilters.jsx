import CheckBoxFilter from "./CheckBoxFilter";
import RangeSliderFilter from "./RangeSliderFilter";

function AttributeFilters({ filters, setFilters }) {
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
    </div>
  );
}

export default AttributeFilters;
