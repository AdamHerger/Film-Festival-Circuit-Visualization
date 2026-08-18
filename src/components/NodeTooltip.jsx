function NodeTooltip({ node }) {
  if (!node) return null;
  const ReleaseTypes = [];
  return (
    <div className="tooltip">
      <h3>{node.type}</h3>
      {node.title && <p>Title: {node.title}</p>}
      {node.label && <p>Festival: {node.label}</p>}
      {node.year && <p>Year: {node.year}</p>}
      {node.country && node.type === "film" && (
        <p>Countries: {node.country.join(", ")}</p>
      )}
      {node.country && node.type === "festival" && (
        <p>Country: {node.country.join(", ")}</p>
      )}
      {node.city && <p>City: {node.city.join(", ")}</p>}
      {node.runtime && <p>Runtime: {node.runtime} minutes</p>}
      {node.genre?.length > 0 && <p>Genre: {node.genre.join(", ")}</p>}
      {node.region?.length > 0 && <p>Region: {node.region.join(", ")}</p>}
      {node.connections && <p>Connections: {node.connections}</p>}

      {node.releaseTypes?.length > 0 && (
        <p>Release Types: {node.releaseTypes.join(", ")}</p>
      )}

      {node.director?.length > 0 && (
        <p>Directors: {node.director.join(", ")}</p>
      )}
      {node.awards?.length > 0 && <p>Awards: {node.awards.join(", ")}</p>}
      {node.languages && <p>Languages: {node.languages}</p>}
      {node.genres && <p>Genres: {node.genres}</p>}
      {node.rating && <p>Rating: {node.rating}</p>}
      {node.budget && <p>Budget: {node.budget}</p>}
      {node.openingusa && <p>Opening USA: {node.openingusa}</p>}
      {node.grossusa && <p>Gross USA: {node.grossusa}</p>}
      {node.grossworld && <p>Gross World: {node.grossworld}</p>}
    </div>
  );
}

export default NodeTooltip;
