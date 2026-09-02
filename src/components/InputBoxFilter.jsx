function InputBoxFilter({ label, value1, value2, filters, setFilters }) {
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
      />
    </>
  );
}

export default InputBoxFilter;
