import { Dispatch, SetStateAction, useEffect, useState, useMemo } from "react"
import { db } from "../../../../firebase"
import { convertDate } from "../../utilis/date"

export interface UseRecordReturn {
  onSetReps: (e: string, exerciseName: string) => void
  onSetSets: (e: string, exerciseName: string) => void
  onSetRestTime: (e: string, exerciseName: string) => void
  onSetWeights: (e: any, exerciseName: string) => void
  onChangeCompletedSets: (e: any, exerciseName: string) => void
  setTypeLog: Dispatch<SetStateAction<string>>
  updateTotal: () => void
}

export interface UseRecordProps {
  date: Date
  total: any
  setTotal: Dispatch<SetStateAction<any>>
  position: string
}

export const useRecord = ({
  date,
  total,
  setTotal,
  position,
}: UseRecordProps): UseRecordReturn => {
  const [typeLog, setTypeLog] = useState("")
  useEffect(() => {
    db.collection("logs")
      .get()
      .then((querySnapshot) => {
        if (typeLog === "date") {
          querySnapshot.forEach((doc) => {
            if (doc.data().date === convertDate(date)) {
              setTotal({ date: doc.data().date, id: doc.id })
              setTotal((pre) => ({
                ...pre,
                data: Object.values(doc.data().total),
              }))
            }
          })
        }
        if (typeLog === "position") {
          const record = [] as any
          querySnapshot.forEach((doc) => {
            doc.data().total.forEach((ex) => {
              if (ex.name === position) record.push({ id: doc.id, data: ex })
            })
          })
        }
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
    onSetReps,
    onSetSets,
    onSetRestTime,
    onSetWeights,
    onChangeCompletedSets,
    updateTotal,
    setTypeLog,
  }
}
