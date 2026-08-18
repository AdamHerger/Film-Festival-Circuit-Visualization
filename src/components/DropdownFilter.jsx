import Select from "react-select";
import { useMemo, useState } from "react";

function DropdownFilter({ label, value, options, filters, setFilters }) {
  const [inputValue, setInputValue] = useState("");

  const selectOptions = useMemo(
    () =>
      options.map((option) =>
        typeof option === "string" ? { value: option, label: option } : option,
      ),
    [options],
  );

  const selectedOptions = (filters[value] || []).map((option) => ({
    value: option,
    label: option,
  }));

  const filteredOptions = useMemo(() => {
    const search = inputValue.toLowerCase();

    return selectOptions
      .filter((option) => option.label.toLowerCase().includes(search))
      .slice(0, 50);
  }, [selectOptions, inputValue]);

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
        options={filteredOptions}
        value={selectedOptions}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={(newValue, actionMeta) => {
          if (actionMeta.action === "input-change") {
            setInputValue(newValue);
          }
        }}
        placeholder={`Select ${label}...`}
        closeMenuOnSelect={false}
        classNamePrefix="filter-select"
        noOptionsMessage={() => (inputValue ? "No results" : `No options`)}
      />
    </>
  );
}

export default DropdownFilter;
