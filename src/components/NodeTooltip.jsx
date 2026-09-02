function NodeTooltip({ node }) {
  if (!node) return null;
  const ReleaseTypes = [];
  return (
    <div className="tooltip">
      <p>
        <b>Type: </b>
        {node.type}
      </p>
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
      {node.city && (
        <p>
          <b>City:</b> {node.city.join(", ")}
        </p>
      )}
      {node.runtime && (
        <p>
          <b>Runtime:</b> {node.runtime} minutes
        </p>
      )}
      {node.genre?.length > 0 && (
        <p>
          <b>Category:</b> {node.genre.join(", ")}
        </p>
      )}
      {node.region?.length > 0 && (
        <p>
          <b>Region:</b> {node.region.join(", ")}
        </p>
      )}
      {node.connections && (
        <p>
          <b>Connections:</b> {node.connections}
        </p>
      )}
      {node.releaseTypes?.length > 0 && (
        <p>
          <b>Release Types:</b> {node.releaseTypes.join(", ")}
        </p>
      )}
      {node.director?.length > 0 && (
        <p>
          <b>Directors:</b> {node.director.join(", ")}
        </p>
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
        <p>
          <b>Languages:</b> {node.languages.join(", ")}
        </p>
      )}
      {node.genres?.length > 0 && (
        <p>
          <b>Genres:</b> {node.genres.join(", ")}
        </p>
      )}
      {node.rating && (
        <p>
          <b>Rating: </b>
          {node.rating}
        </p>
      )}
      {node.budget && node.budget !== -1 ? (
        <p>
          <b>Budget:</b>{" "}
          {node.budget.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      ) : (
        <p>
          <b>Budget: </b> NA
        </p>
      )}
      {node.openingusa && node.openingusa !== -1 ? (
        <p>
          <b>Opening USA: </b>
          {node.openingusa.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      ) : (
        <p>
          <b>Opening USA:</b> NA
        </p>
      )}
      {node.grossusa && node.grossusa !== -1 ? (
        <p>
          <b>Gross USA: </b>
          {node.grossusa.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      ) : (
        <p>
          <b>Gross USA:</b> NA
        </p>
      )}
      {node.grossworld && node.grossworld !== -1 ? (
        <p>
          <b>Gross World: </b>
          {node.grossworld.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      ) : (
        <p>
          <b>Gross World:</b> NA
        </p>
      )}{" "}
    </div>
  );
}

export default NodeTooltip;
