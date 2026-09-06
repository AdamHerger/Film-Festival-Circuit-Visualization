import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function CompositeScoreRangeSlider({ filters, setFilters }) {
  const min = filters?.minCompositeScore ?? 0;
  const max = filters?.maxCompositeScore ?? 100;

  return (
    <div className="composite-score-slider">
      <div>Composite Score Range</div>
      <label className="slider-label">
        {min} - {max}
      </label>

      <div className="range-slider">
        <Slider
          range
          min={0}
          max={100}
          step={1}
          value={[min, max]}
          onChange={(e) =>
            setFilters({
              ...filters,
              minCompositeScore: e[0],
              maxCompositeScore: e[1],
            })
          }
        />
      </div>
    </div>
  );
}

export default CompositeScoreRangeSlider;
