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
  const min = filters?.[value1] ?? minval;
  const max = filters?.[value2] ?? maxval;
  return (
    <>
      <div>{label}</div>
      <label className="slider-label">
        {min} - {max}
      </label>
      <DistributionGraph
        data={graph}
        attribute={attribute}
        min={min}
        max={max}
      />
      <div className="range-slider">
        <Slider
          range
          min={minval}
          max={maxval}
          step={step}
          value={[min, max]}
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
