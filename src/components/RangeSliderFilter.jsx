import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function RangeSliderFilter({
  label,
  minval,
  maxval,
  value1,
  value2,
  filters,
  setFilters,
}) {
  return (
    <>
      <div>{label}</div>
      <label className="slider-label">
        {filters[value1]} - {filters[value2]}
      </label>
      <div className="range-slider">
        <Slider
          range
          min={minval}
          max={maxval}
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
