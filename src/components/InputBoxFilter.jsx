function InputBoxFilter({ label, value, filters, setFilters }) {
  return (
    <>
      <div>{label}</div>

      <input
        type="text"
        value={filters[value]}
        onChange={(e) =>
          setFilters({
            ...filters,
            [value]: e.target.value,
          })
        }
      />
    </>
  );
}

export default InputBoxFilter;
