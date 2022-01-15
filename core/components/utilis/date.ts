export const convertDate = (date: Date): string => {
  const formatDate = date.toString()
  return formatDate.split(" ").slice(1, 4).join(" ")
}

export const convertDateToNumber = (date: Date) => {
  return {
    month: date.getMonth() + 1,
    day: date.getDate(),
    year: date.getFullYear(),
  }
}

export const compareDate = (date1: any, date2: any) => {
  return (
    date1.month === date2.month &&
    date1.day === date2.day &&
    date1.year === date2.year
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
