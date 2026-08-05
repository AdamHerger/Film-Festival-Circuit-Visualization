function CheckBoxFilter({ label, attribute, filters, setFilters }) {
  return (
    <label className="checkbox-label">
      {label}
      <input
        type="checkbox"
        checked={filters[attribute]}
        onChange={(e) =>
          setFilters({
            ...filters,
            [attribute]: e.target.checked,
          })
        }
      />
    </label>
  );
}

export default CheckBoxFilter;
