import { useEffect, useState } from "react"
import { db } from "../../../../firebase"
import { convertDate } from "../../utilis/date"

export interface UseRoutineReturn {
  routine: string[]
}

export const useRoutine = (date: Date): UseRoutineReturn => {
  const [routine, setRoutine] = useState({} as any)
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

  return {
    routine,
  }
}
