export const convertDate = (date: Date): string => {
  const formatDate = date.toString()
  return formatDate.split(" ").slice(1, 4).join(" ")
}
