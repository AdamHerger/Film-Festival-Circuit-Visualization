import DistributionGraph from "./DistributionGraph";

function InputBoxFilter({
  label,
  attribute,
  value1,
  value2,
  filters,
  setFilters,
  graph,
}) {
  return (
    <>
      <div>{label}</div>
      <input
        className="input-field"
        type="number"
        placeholder="Leave Blank For No Min"
        value={null}
        onChange={(e) =>
          setFilters({
            ...filters,
            [value1]: e.target.value,
          })
        }
      />
      <input
        className="input-field"
        type="number"
        placeholder="Leave Blank For No Max"
        value={null}
        onChange={(e) =>
          setFilters({
            ...filters,
            [value2]: e.target.value,
          })
        }
      />{" "}
      <br /> <br />
      <DistributionGraph
        data={graph}
        attribute={attribute}
        min={filters[value1]}
        max={filters[value2]}
      />
    </>
  );
}

export default InputBoxFilter;
