import { useEffect, useState } from "react"
import { db } from "../../../../firebase"

export interface UseGetDataBaseReturn {
  database: any[]
}

export const useGetDatabase = (): UseGetDataBaseReturn => {
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

  return { database }
}
