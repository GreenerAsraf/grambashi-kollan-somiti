export const getDateOnly = (timestamp) => {
  const date = new Date(timestamp)
  const formattedDate = date.toISOString().substring(0, 10)
  return formattedDate
}
