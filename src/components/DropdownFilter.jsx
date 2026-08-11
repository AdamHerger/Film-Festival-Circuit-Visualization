import Select from "react-select";

function DropdownFilter({ label, value, options, filters, setFilters }) {
  const selectedOptions = (filters[value] || []).map((option) => ({
    value: option,
    label: option,
  }));

  const handleChange = (selected) => {
    setFilters({
      ...filters,
      [value]: selected ? selected.map((option) => option.value) : [],
    });
  };

  return (
    <>
      <div>{label}</div>
      <Select
        isMulti
        isClearable
        isSearchable
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder={`Select ${label.toLowerCase()}...`}
        closeMenuOnSelect={false}
        classNamePrefix="filter-select"
      />
    </>
  );
}

export default DropdownFilter;
