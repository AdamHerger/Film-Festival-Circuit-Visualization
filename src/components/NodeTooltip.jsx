function NodeTooltip({ node }) {
  if (!node) return null;
  const ReleaseTypes = [];
  return (
    <div className="tooltip">
      <h3>{node.type}</h3>
      {node.title && (
        <p>
          <b>Title:</b> {node.title}
        </p>
      )}
      {node.label && (
        <p>
          <b>Festival:</b> {node.label}
        </p>
      )}
      {node.year && (
        <p>
          <b>Year:</b> {node.year}
        </p>
      )}
      {node.country && node.country.length > 1 && (
        <p>
          <b>Countries:</b> {node.country.join(", ")}
        </p>
      )}
      {node.country && node.country.length === 1 && (
        <p>
          <b>Country:</b> {node.country.join(", ")}
        </p>
      )}
      {node.city && <p>City: {node.city.join(", ")}</p>}
      {node.runtime && <p>Runtime: {node.runtime} minutes</p>}
      {node.genre?.length > 0 && <p>Category: {node.genre.join(", ")}</p>}
      {node.region?.length > 0 && <p>Region: {node.region.join(", ")}</p>}
      {node.connections && <p>Connections: {node.connections}</p>}
      {node.releaseTypes?.length > 0 && (
        <p>Release Types: {node.releaseTypes.join(", ")}</p>
      )}
      {node.director?.length > 0 && (
        <p>Directors: {node.director.join(", ")}</p>
      )}
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
      {node.languages?.length > 0 && (
        <p>Languages: {node.languages.join(", ")}</p>
      )}
      {node.genres?.length > 0 && <p>Genres: {node.genres.join(", ")}</p>}
      {node.rating && <p>Rating: {node.rating}</p>}
      {node.budget && node.budget !== -1 ? (
        <p>
          Budget:{" "}
          {node.budget.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      ) : (
        <p>Budget: NA</p>
      )}
      {node.openingusa && node.openingusa !== -1 ? (
        <p>
          Opening USA:{" "}
          {node.openingusa.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      ) : (
        <p>Opening USA: NA</p>
      )}
      {node.grossusa && node.grossusa !== -1 ? (
        <p>
          Gross USA:{" "}
          {node.grossusa.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      ) : (
        <p>Gross USA: NA</p>
      )}
      {node.grossworld && node.grossworld !== -1 ? (
        <p>
          Gross World:{" "}
          {node.grossworld.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      ) : (
        <p>Gross World: NA</p>
      )}{" "}
    </div>
  );
}

export default NodeTooltip;
