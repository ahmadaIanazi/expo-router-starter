export default function splitByCategory(data, categoryKey) {
  if (!Array.isArray(data)) {
    console.error('Input data is not an array.');
    return { result: {}, categoryKeys: [] };
  }

  const result = {};
  const categoryKeys = [];

  data.forEach((item) => {
    const categoryValue = item[categoryKey];
    if (categoryValue !== undefined) {
      if (!result[categoryValue]) {
        result[categoryValue] = [];
        categoryKeys.push(categoryValue);
      }
      result[categoryValue].push(item);
    }
  });

  return { result, categoryKeys };
}
