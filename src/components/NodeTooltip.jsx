function NodeTooltip({ node }) {
  if (!node) return null;

  const currencyFormat = (val) =>
    val && val !== -1
      ? val.toLocaleString("en-US", { style: "currency", currency: "USD" })
      : "NA";

  const renderLine = (label, val, formatter) => {
    let displayVal = "NA";

    if (val !== undefined && val !== null && val !== "" && val !== -1) {
      if (Array.isArray(val)) {
        displayVal =
          val.length > 0 ? (formatter ? formatter(val) : val.join(", ")) : "NA";
      } else {
        displayVal = formatter ? formatter(val) : val;
      }
    }
    return (
      <p key={label}>
        <b>{label}: </b> {displayVal}
      </p>
    );
  };

  return (
    <div className="tooltip">
      {renderLine("Type", node.type)}

      {node.type === "festival" ? (
        <>
          {renderLine("Festival", node.label)}
          {renderLine("Category", node.festivalCategory)}
          {renderLine("Founding Year", node.festivalYear)}
          {renderLine("Country", node.festivalCountry || node.country)}
          {renderLine("City", node.festivalCity || node.city)}
          {renderLine("Region", node.festivalRegion || node.region)}
          {renderLine("Connections", node.connections)}
        </>
      ) : (
        <>
          {renderLine("Title", node.title)}
          {renderLine("Category", node.genre || node.festivalCategory)}
          {renderLine("Genres", node.genres)}
          {renderLine("Country", node.festivalCountry || node.country)}
          {renderLine("City", node.festivalCity || node.city)}
          {renderLine("Region", node.festivalRegion || node.region)}
          {renderLine("Year", node.year)}
          {renderLine("Runtime", node.runtime, (v) => `${v} minutes`)}
          {renderLine("Release Types", node.releaseTypes)}
          {renderLine("Gender Team", node.genderTeam)}
          {renderLine("Connections", node.connections)}
          {renderLine("Directors", node.director)}
          {renderLine("Languages", node.languages)}
          {renderLine("Rating", node.rating)}

          {node.awards?.length > 0 && (
            <p>
              <b>Awards</b>
              {node.awards.map((award, i) => (
                <span key={i}>
                  <br />-{award}
                </span>
              ))}
            </p>
          )}

          {renderLine("Budget", node.budget, currencyFormat)}
          {renderLine("Opening USA", node.openingusa, currencyFormat)}
          {renderLine("Gross USA", node.grossusa, currencyFormat)}
          {renderLine("Gross World", node.grossworld, currencyFormat)}
        </>
      )}
    </div>
  );
}

export default NodeTooltip;
