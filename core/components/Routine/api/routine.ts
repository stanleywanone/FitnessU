import { Dispatch, SetStateAction, useEffect, useState, useMemo } from "react"
import { db } from "../../../../firebase"
import { compareDate } from "../../utilis/date"

export interface UseRoutineReturn {
  routine: string[]
  editable: string
  setEditable: Dispatch<SetStateAction<string>>
  onSetReps: (e: string, exerciseName: string) => void
  onSetSets: (e: string, exerciseName: string) => void
  onSetCompletedSets: (exerciseName: string) => void
  onSetRestTime: (e: string, exerciseName: string) => void
  onSetWeights: (e: any, exerciseName: string) => void
  onChangeCompletedSets: (e: any, exerciseName: string) => void
  storeTotal: (total: any) => void
  getRestTimeSeconds: string
  setRefreshing: Dispatch<SetStateAction<boolean>>
  refreshing: boolean
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
  const [refreshing, setRefreshing] = useState(false)
  useEffect(() => {
    db.collection("routine")
      .get()
      .then((querySnapshot) => {
        setRoutine({})
        setTotal([])
        querySnapshot.forEach((doc) => {
          if (compareDate(doc.data().date.toDate(), date)) {
            setRoutine(Object.values(doc.data().exercise))
            return
          }
        })
      })
    setRefreshing(false)
  }, [db, date, refreshing])

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

  const onSetCompletedSets = (exerciseName: string) => {
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

  const onChangeCompletedSets = (e: string, exerciseName: string) => {
    const exerciseIndex = total?.findIndex((i: any) => i.name === exerciseName)

    if (exerciseIndex > -1) {
      setTotal([
        ...total.slice(0, exerciseIndex),
        { ...total[exerciseIndex], completedSets: e },
        ...total.slice(exerciseIndex + 1),
      ])
      return
    }
    setTotal([...total, { name: exerciseName, completedSets: e }])
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

  const getRestTimeSeconds = useMemo(() => {
    const index = total?.findIndex((i: any) => i.name === editable)
    if (index > -1) return total[index].restTime
    return "0"
  }, [editable, total])

  const storeTotal = (total: any) => {
    db.collection("logs")
      .add({
        total: { ...total },
        date: date,
      })
      .then(() => {
        console.log("ok")
      })
      .catch((err) => {
        console.log("err, ", err)
      })
  }

  return {
    routine,
    editable,
    setEditable,
    onSetReps,
    onSetSets,
    onSetRestTime,
    onSetCompletedSets,
    onSetWeights,
    onChangeCompletedSets,
    getRestTimeSeconds,
    storeTotal,
    setRefreshing,
    refreshing,
  }
}
