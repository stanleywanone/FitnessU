import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { db } from "../../../../firebase"
import { convertDate } from "../../utilis/date"

export interface Database {
  id: string
  position: string
  name: string
}

export interface UseGetDataBaseReturn {
  database: any[]
  addRoutine: (exercises: string[]) => void
}

export const useDatabase = (
  selectItem: string,
  setCollectItems: Dispatch<SetStateAction<string[]>>,
  date: Date
): UseGetDataBaseReturn => {
  const [database, setDatabase] = useState([])

  useEffect(() => {
    db.collection("database")
      .get()
      .then((querySnapshot) => {
        const items = [] as any
        querySnapshot.forEach((doc) => {
          items.push(doc.data())
        })
        setDatabase(items)
      })
  }, [db])

  const addRoutine = (exercises: string[]) => {
    db.collection("routine")
      .add({
        exercise: { ...exercises },
        date: convertDate(date),
      })
      .then(() => {
        console.log("ok")
        setCollectItems([])
      })
      .catch((err) => {
        console.log("err, ", err)
      })
  }

  return {
    database:
      selectItem === "All"
        ? database
        : database.filter((i: Database) => i.position === selectItem),
    addRoutine,
  }
}
