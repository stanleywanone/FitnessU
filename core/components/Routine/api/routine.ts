import { Dispatch, SetStateAction, useEffect, useState, useMemo } from "react"
import { db } from "../../../../firebase"
import { convertDate } from "../../utilis/date"

export interface UseRoutineReturn {
  routine: string[]
  total: any[]
  editable: string
  setEditable: Dispatch<SetStateAction<string>>
  onSetReps: (e: string, exerciseName: string) => void
  onSetSets: (e: string, exerciseName: string) => void
  onSetRestTime: (e: string, exerciseName: string) => void
  getReps: (e: string) => string
  getSets: (e: string) => string
  getRestTime: (e: string) => string
  getRestTimeSeconds: string
}

export const useRoutine = (date: Date): UseRoutineReturn => {
  const [routine, setRoutine] = useState({} as any)
  const [total, setTotal] = useState([] as any)
  const [editable, setEditable] = useState("")
  useEffect(() => {
    db.collection("routine")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().date === convertDate(date))
            setRoutine(Object.values(doc.data().exercise))
        })
      })
  }, [db])
  const onSetReps = (e: string, exerciseName: string) => {
    const exerciseIndex = total.findIndex((i: any) => i.name === exerciseName)

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
    const exerciseIndex = total.findIndex((i: any) => i.name === exerciseName)

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
    const exerciseIndex = total.findIndex((i: any) => i.name === exerciseName)

    if (exerciseIndex > -1) {
      console.log("already, ")
      setTotal([
        ...total.slice(0, exerciseIndex),
        { ...total[exerciseIndex], restTime: e },
        ...total.slice(exerciseIndex + 1),
      ])
      return
    }
    console.log("create new, ")
    setTotal([...total, { name: exerciseName, restTime: e }])
  }

  const getReps = (exercise: string) => {
    const index = total.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].reps) return total[index].reps
    return "0"
  }

  const getSets = (exercise: string) => {
    const index = total.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].sets) return total[index].sets
    return "0"
  }

  const getRestTime = (exercise: string) => {
    const index = total.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].restTime) return total[index].restTime
    return "0"
  }

  const getRestTimeSeconds = useMemo(() => {
    const index = total.findIndex((i: any) => i.name === editable)
    if (index > -1) return total[index].restTime
    return "0"
  }, [editable, total])

  return {
    routine,
    total,
    editable,
    setEditable,
    onSetReps,
    onSetSets,
    onSetRestTime,
    getReps,
    getSets,
    getRestTime,
    getRestTimeSeconds,
  }
}
