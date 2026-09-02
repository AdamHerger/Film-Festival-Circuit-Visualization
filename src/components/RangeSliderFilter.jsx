import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import DistributionGraph from "./DistributionGraph";

function RangeSliderFilter({
  label,
  attribute,
  minval,
  maxval,
  step,
  value1,
  value2,
  filters,
  setFilters,
  graph,
}) {
  return (
    <>
      <div>{label}</div>
      <label className="slider-label">
        {filters[value1]} - {filters[value2]}
      </label>
      <DistributionGraph
        data={graph}
        attribute={attribute}
        min={filters[value1]}
        max={filters[value2]}
      />
      <div className="range-slider">
        <Slider
          className="slider"
          range
          min={minval}
          max={maxval}
          step={step}
          value={[filters[value1], filters[value2]]}
          onChange={(e) =>
            setFilters({
              ...filters,
              [value1]: e[0],
              [value2]: e[1],
            })
          }
        />
      </div>
    </>
  );
}

export default RangeSliderFilter;
