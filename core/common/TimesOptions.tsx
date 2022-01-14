export interface SelectOption {
  value: string
  label: string
}

export const iterator = (
  start: number,
  end: number,
  inc: number
): SelectOption[] => {
  const result = [] as any
  for (let i = start; i <= end; i += inc) {
    if (inc < 1) {
      result.push({
        value: i.toFixed(1).toString(),
        label: i.toFixed(1).toString(),
      })
    } else {
      result.push({
        value: i.toString(),
        label: i.toString(),
      })
    }
  }
  return result
}

export const repsOptions = iterator(0, 20, 1)

export const setOptions = iterator(0, 10, 1)

export const restTimeOptions = iterator(0, 5, 0.5)

export const totalOptions = iterator(0, 400, 1)

export const weightOptions = iterator(5, 400, 5)
