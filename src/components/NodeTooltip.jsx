function NodeTooltip({ node }) {
  if (!node) return null;

  return (
    <div className="tooltip">
      <h3>{node.type}</h3>

      {node.title && <p>Title: {node.title}</p>}

      {node.label && <p>Festival: {node.label}</p>}

      {node.year && <p>Year: {node.year}</p>}

      {node.country && <p>Countries: {node.country.join(", ")}</p>}

      {node.city && <p>City: {node.city}</p>}

      {node.runtime && <p>Runtime: {node.runtime} minutes</p>}

      {node.genre?.length > 0 && <p>Genre: {node.genre.join(", ")}</p>}

      {node.director?.length > 0 && (
        <p>Directors: {node.director.join(", ")}</p>
      )}
    </div>
  );
}

export default NodeTooltip;
