export const convertDate = (date: Date): string => {
  const formatDate = date.toString()
  return formatDate.split(" ").slice(1, 4).join(" ")
}

export const convertDateToString = (date: Date) => {
  const month = converMonthToString(date.getMonth() + 1)
  const day = date.getDate().toString()
  const year = date.getFullYear().toString()

  return month + " " + day + " " + year
}

export const compareDate = (date1: Date, date2: Date) => {
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

export const converMonthToString = (month: number) => {
  switch (month) {
    case 1:
      return "Jan"
    case 2:
      return "Feb"
    case 3:
      return "Mar"
    case 4:
      return "Apr"
    case 5:
      return "May"
    case 6:
      return "Jun"
    case 7:
      return "Jul"
    case 8:
      return "Aug"
    case 9:
      return "Spe"
    case 10:
      return "Oct"
    case 11:
      return "Nov"
    case 12:
      return "Dec"
  }
}
