import { Dispatch, SetStateAction, useEffect, useState, useMemo } from "react"
import { db } from "../../../../firebase"
import { convertDate } from "../../utilis/date"

export interface UseRecordReturn {
  routine: string[]

  editable: string
  setEditable: Dispatch<SetStateAction<string>>
  onSetReps: (e: string, exerciseName: string) => void
  onSetSets: (e: string, exerciseName: string) => void
  onSetCompletedSets: (exerciseName: string) => void
  onSetRestTime: (e: string, exerciseName: string) => void
  onSetWeights: (e: any, exerciseName: string) => void
  onChangeCompletedSets: (e: any, exerciseName: string) => void
  getReps: (e: string) => string
  getSets: (e: string) => string
  getRestTime: (e: string) => string
  getCompletedSets: (e: string) => string
  updateTotal: () => void
  getWeights: (e: string) => string
}

export interface UseRecordProps {
  date: Date
  total: any
  setTotal: Dispatch<SetStateAction<any>>
}

export const useRecord = ({
  date,
  total,
  setTotal,
}: UseRecordProps): UseRecordReturn => {
  const [routine, setRoutine] = useState({} as any)
  const [editable, setEditable] = useState("")
  const [time, setTime] = useState("0")
  useEffect(() => {
    db.collection("logs")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().date === convertDate(date)) {
            setTotal({ date: doc.data().date, id: doc.id })
            setTotal((pre) => ({
              ...pre,
              data: Object.values(doc.data().total),
            }))
          }
        })
      })
  }, [db, date])

  const onSetReps = (e: string, exerciseName: string) => {
    const exerciseIndex = total.data.findIndex(
      (i: any) => i.name === exerciseName
    )

    if (exerciseIndex > -1) {
      const newData = [
        ...total.data.slice(0, exerciseIndex),
        { ...total.data[exerciseIndex], reps: e },
        ...total.data.slice(exerciseIndex + 1),
      ]
      setTotal({
        id: total.id,
        date: total.date,
        data: newData,
      })
      return
    }
    setTotal([...total, { name: exerciseName, reps: e }])
  }

  const onSetSets = (e: string, exerciseName: string) => {
    const exerciseIndex = total.data.findIndex(
      (i: any) => i.name === exerciseName
    )

    if (exerciseIndex > -1) {
      const newData = [
        ...total.data.slice(0, exerciseIndex),
        { ...total.data[exerciseIndex], sets: e },
        ...total.data.slice(exerciseIndex + 1),
      ]
      setTotal({
        id: total.id,
        date: total.date,
        data: newData,
      })
      return
    }
    setTotal([...total, { name: exerciseName, sets: e }])
  }

  const onSetRestTime = (e: string, exerciseName: string) => {
    const exerciseIndex = total.data.findIndex(
      (i: any) => i.name === exerciseName
    )

    if (exerciseIndex > -1) {
      const newData = [
        ...total.data.slice(0, exerciseIndex),
        { ...total.data[exerciseIndex], restTime: e },
        ...total.data.slice(exerciseIndex + 1),
      ]
      setTotal({
        id: total.id,
        date: total.date,
        data: newData,
      })
      return
    }
    setTotal([...total, { name: exerciseName, restTime: e }])
  }

  const onSetCompletedSets = (exerciseName: string) => {
    const exerciseIndex = total.data.findIndex(
      (i: any) => i.name === exerciseName
    )
    if (exerciseIndex > -1 && total[exerciseIndex].completedSets) {
      setTotal([
        ...total.data.slice(0, exerciseIndex),
        {
          ...total.data[exerciseIndex],
          completedSets: (
            parseInt(total[exerciseIndex].completedSets) + 1
          ).toString(),
        },
        ...total.data.slice(exerciseIndex + 1),
      ])
      return
    }
    setTotal([
      ...total.data.slice(0, exerciseIndex),
      {
        ...total.data[exerciseIndex],
        completedSets: "1",
      },
      ...total.data.slice(exerciseIndex + 1),
    ])
  }

  const onChangeCompletedSets = (e: string, exerciseName: string) => {
    const exerciseIndex = total.data.findIndex(
      (i: any) => i.name === exerciseName
    )

    if (exerciseIndex > -1) {
      const newData = [
        ...total.data.slice(0, exerciseIndex),
        { ...total.data[exerciseIndex], completedSets: e },
        ...total.data.slice(exerciseIndex + 1),
      ]
      setTotal({
        id: total.id,
        date: total.date,
        data: newData,
      })
      return
    }
    setTotal([...total, { name: exerciseName, completedSets: e }])
  }

  const onSetWeights = (e: any, exerciseName: string) => {
    const exerciseIndex = total.data?.findIndex(
      (i: any) => i.name === exerciseName
    )
    if (exerciseIndex > -1) {
      const newData = [
        ...total.data.slice(0, exerciseIndex),
        { ...total.data[exerciseIndex], weights: e },
        ...total.data.slice(exerciseIndex + 1),
      ]
      setTotal({
        id: total.id,
        date: total.date,
        data: newData,
      })
      return
    }
    setTotal([...total, { name: exerciseName, weights: e }])
  }

  const getReps = (exercise: string) => {
    const index = total.data.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].reps) return total[index].reps
    return "0"
  }

  const getSets = (exercise: string) => {
    const index = total.data.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].sets) return total[index].sets
    return "0"
  }

  const getRestTime = (exercise: string) => {
    const index = total.data.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].restTime) return total[index].restTime
    return "0"
  }

  const getWeights = (exercise: string) => {
    const index = total.data.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].weights) return total[index].weights
  }

  const getCompletedSets = (exercise: string) => {
    const index = total.data.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].completedSets)
      return total[index].completedSets
    return "0"
  }

  const updateTotal = () => {
    db.collection("logs")
      .doc(total.id)
      .update({ total: total.data })
      .then(() => {
        console.log("updated!")
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
    getReps,
    getSets,
    getRestTime,
    getCompletedSets,
    getWeights,
    onChangeCompletedSets,
    // getRestTimeSeconds,
    updateTotal,
  }
}
