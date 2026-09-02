function IncludeNABox({ attribute, filters, setFilters }) {
  return (
    <label className="checkbox-label">
      Include NA Values
      <input
        type="checkbox"
        checked={filters.includeNA.get(attribute) ?? true}
        onChange={(e) => {
          const newIncludeNA = new Map(filters.includeNA);
          newIncludeNA.set(attribute, e.target.checked);

          setFilters({
            ...filters,
            includeNA: newIncludeNA,
          });
        }}
      />
    </label>
  );
}

export default IncludeNABox;
