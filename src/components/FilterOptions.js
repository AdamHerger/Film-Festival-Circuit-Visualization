export function getUniqueOptions(
  films,
  attributes,
  { exclude = ["", "NA", null, undefined], sort = true } = {},
) {
  const attributeList = Array.isArray(attributes) ? attributes : [attributes];

  const values = new Set();

  films.forEach((film) => {
    attributeList.forEach((attribute) => {
      const value = film[attribute];
      if (!exclude.includes(value)) {
        values.add(value);
      }
    });
  });

  const result = [...values];

  if (sort) {
    result.sort((a, b) => String(a).localeCompare(String(b)));
  }

  return result.map((value) => ({
    value,
    label: String(value),
  }));
}
