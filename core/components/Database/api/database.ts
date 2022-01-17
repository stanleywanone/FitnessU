import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { db } from "../../../../firebase"
import { SelectOption } from "../../../common/TimesOptions"
import { convertDate } from "../../utilis/date"

export interface Database {
  id: string
  position: string
  name: string
}

export interface UseGetDataBaseReturn {
  database: any[]
  addRoutine: (exercises: string[]) => void
  positionOptions: SelectOption[]
  openCustomerDatabase: boolean
  setOpenCustomerDatabase: Dispatch<SetStateAction<boolean>>
  newDataName: string
  newDataPostion: string
  setNewDataPostion: Dispatch<SetStateAction<string>>
  setNewDataName: Dispatch<SetStateAction<string>>
  addNewData: () => void
}

export const useDatabase = (
  selectItem: string,
  setCollectItems: Dispatch<SetStateAction<string[]>>,
  date: Date
): UseGetDataBaseReturn => {
  const [database, setDatabase] = useState([] as any)
  const [openCustomerDatabase, setOpenCustomerDatabase] = useState(false)
  const [newDataName, setNewDataName] = useState("")

  const [newDataPostion, setNewDataPostion] = useState("")

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
        date: date,
      })
      .then(() => {
        console.log("ok")
        setCollectItems([])
      })
      .catch((err) => {
        console.log("err, ", err)
      })
  }

  const addNewData = () => {
    db.collection("database")
      .add({
        name: newDataName,
        position: newDataPostion,
      })
      .then(() => {
        console.log("ok")
        setDatabase([
          ...database,
          { position: newDataPostion, name: newDataName },
        ])
        setOpenCustomerDatabase(false)
      })
      .catch((err) => {
        console.log("err, ", err)
      })
  }

  const positionOptions = [
    { value: "All", label: "All" },
    { value: "Back", label: "Back" },
    { value: "Chest", label: "Chest" },
    { value: "Leg", label: "Leg" },
    { value: "Shoulder", label: "Shoulder" },
  ]

  return {
    database:
      selectItem === "All"
        ? database
        : database.filter((i: Database) => i.position === selectItem),
    addRoutine,
    positionOptions,
    openCustomerDatabase,
    setOpenCustomerDatabase,
    newDataName,
    newDataPostion,
    setNewDataPostion,
    setNewDataName,
    addNewData,
  }
}
