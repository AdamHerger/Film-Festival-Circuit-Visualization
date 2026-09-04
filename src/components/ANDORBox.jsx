function ANDORBox({ attribute, filters, setFilters }) {
  const isAnd = filters.ANDOR.get(attribute) ?? true;

  const handleToggle = () => {
    const newANDOR = new Map(filters.ANDOR);
    newANDOR.set(attribute, !isAnd);

    setFilters({
      ...filters,
      ANDOR: newANDOR,
    });
  };

  return (
    <button
      type="button"
      className="andor-label"
      style={{ backgroundColor: isAnd ? "#274863" : "#942d2d" }}
      onClick={handleToggle}
    >
      <span>{isAnd ? "AND Logic" : "OR Logic"}</span>
    </button>
  );
}

export default ANDORBox;
