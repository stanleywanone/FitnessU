import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { db } from "../../../../firebase"

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
  setCollectItems: Dispatch<SetStateAction<string[]>>
): UseGetDataBaseReturn => {
  const [database, setDatabase] = useState([])

  useEffect(() => {
    db.collection("database")
      .get()
      .then((querySnapshot) => {
        const items: any[] = []
        querySnapshot.forEach((doc) => {
          items.push(doc.data())
        })
        setDatabase(items as any)
      })
  }, [db])

  const addRoutine = (exercises: string[]) => {
    db.collection("routine")
      .add({
        exercise: { ...exercises },
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
