export const getDateOnly = (timestamp) => {
  // const date = new Date(timestamp)
  // const formattedDate = date.toISOString().substring(0, 10)
  // return formattedDate
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
};
