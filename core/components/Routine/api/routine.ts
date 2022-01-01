import { Dispatch, SetStateAction, useEffect, useState, useMemo } from "react"
import { db } from "../../../../firebase"
import { convertDate } from "../../utilis/date"

export interface UseRoutineReturn {
  routine: string[]

  editable: string
  setEditable: Dispatch<SetStateAction<string>>
  onSetReps: (e: string, exerciseName: string) => void
  onSetSets: (e: string, exerciseName: string) => void
  onSetPrgress: (exerciseName: string) => void
  onSetRestTime: (e: string, exerciseName: string) => void
  onSetWeights: (e: any, exerciseName: string) => void
  getReps: (e: string) => string
  getSets: (e: string) => string
  getRestTime: (e: string) => string
  getCompletedSets: (e: string) => string
  getWeights: (e: string) => string
  getRestTimeSeconds: string
}

export interface UseRoutineProps {
  date: Date
  total: any
  setTotal: Dispatch<SetStateAction<any>>
}

export const useRoutine = ({
  date,
  total,
  setTotal,
}: UseRoutineProps): UseRoutineReturn => {
  const [routine, setRoutine] = useState({} as any)
  const [editable, setEditable] = useState("")
  const [time, setTime] = useState("0")
  useEffect(() => {
    db.collection("routine")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().date === convertDate(date))
            setRoutine(Object.values(doc.data().exercise))
        })
      })
  }, [db, date])
  const onSetReps = (e: string, exerciseName: string) => {
    const exerciseIndex = total?.findIndex((i: any) => i.name === exerciseName)

    if (exerciseIndex > -1) {
      setTotal([
        ...total.slice(0, exerciseIndex),
        { ...total[exerciseIndex], reps: e },
        ...total.slice(exerciseIndex + 1),
      ])
      return
    }
    setTotal([...total, { name: exerciseName, reps: e }])
  }

  const onSetSets = (e: string, exerciseName: string) => {
    const exerciseIndex = total?.findIndex((i: any) => i.name === exerciseName)

    if (exerciseIndex > -1) {
      setTotal([
        ...total.slice(0, exerciseIndex),
        { ...total[exerciseIndex], sets: e },
        ...total.slice(exerciseIndex + 1),
      ])
      return
    }
    setTotal([...total, { name: exerciseName, sets: e }])
  }

  const onSetRestTime = (e: string, exerciseName: string) => {
    const exerciseIndex = total?.findIndex((i: any) => i.name === exerciseName)

    if (exerciseIndex > -1) {
      setTotal([
        ...total.slice(0, exerciseIndex),
        { ...total[exerciseIndex], restTime: e },
        ...total.slice(exerciseIndex + 1),
      ])
      return
    }
    setTotal([...total, { name: exerciseName, restTime: e }])
  }

  const onSetPrgress = (exerciseName: string) => {
    const exerciseIndex = total?.findIndex((i: any) => i.name === exerciseName)
    if (exerciseIndex > -1 && total[exerciseIndex].completedSets) {
      setTotal([
        ...total.slice(0, exerciseIndex),
        {
          ...total[exerciseIndex],
          completedSets: (
            parseInt(total[exerciseIndex].completedSets) + 1
          ).toString(),
        },
        ...total.slice(exerciseIndex + 1),
      ])
      return
    }
    setTotal([
      ...total.slice(0, exerciseIndex),
      {
        ...total[exerciseIndex],
        completedSets: "1",
      },
      ...total.slice(exerciseIndex + 1),
    ])
  }

  const onSetWeights = (e: any, exerciseName: string) => {
    const exerciseIndex = total?.findIndex((i: any) => i.name === exerciseName)
    if (exerciseIndex > -1) {
      setTotal([
        ...total.slice(0, exerciseIndex),
        {
          ...total[exerciseIndex],
          weights: e,
        },
        ...total.slice(exerciseIndex + 1),
      ])
      return
    }
    setTotal([...total, { name: exerciseName, weights: e }])
  }

  const getReps = (exercise: string) => {
    const index = total?.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].reps) return total[index].reps
    return "0"
  }

  const getSets = (exercise: string) => {
    const index = total?.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].sets) return total[index].sets
    return "0"
  }

  const getRestTime = (exercise: string) => {
    const index = total?.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].restTime) return total[index].restTime
    return "0"
  }

  const getWeights = (exercise: string) => {
    const index = total?.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].weights) return total[index].weights
    return "0"
  }

  const getCompletedSets = (exercise: string) => {
    const index = total?.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].completedSets)
      return total[index].completedSets
    return "0"
  }

  const getRestTimeSeconds = useMemo(() => {
    const index = total?.findIndex((i: any) => i.name === editable)
    if (index > -1) return total[index].restTime
    return "0"
  }, [editable, total])

  return {
    routine,
    editable,
    setEditable,
    onSetReps,
    onSetSets,
    onSetRestTime,
    onSetPrgress,
    onSetWeights,
    getReps,
    getSets,
    getRestTime,
    getCompletedSets,
    getWeights,
    getRestTimeSeconds,
  }
}
