import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function SingleRangeSlider({ label, minval, maxval, value, setValue }) {
  return (
    <>
      <div>{label}</div>
      <div className="slider-label">{value}</div>
      <div className="force-slider">
        <Slider
          min={minval}
          max={maxval}
          value={value}
          onChange={(e) => setValue(e)}
        />
      </div>
    </>
  );
}

export default SingleRangeSlider;
