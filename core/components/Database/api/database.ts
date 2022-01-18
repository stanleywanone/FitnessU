import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { RefreshControl } from "react-native"
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
  setRefreshing: Dispatch<SetStateAction<boolean>>
  refreshing: boolean
  checkDateAvailable: () => boolean
  dateAvailable: boolean
}

export const useDatabase = (
  selectItem: string,
  setCollectItems: Dispatch<SetStateAction<string[]>>,
  date: Date
): UseGetDataBaseReturn => {
  const [database, setDatabase] = useState([] as any)
  const [openCustomerDatabase, setOpenCustomerDatabase] = useState(false)
  const [newDataName, setNewDataName] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [newDataPostion, setNewDataPostion] = useState("")
  const [routines, setRoutines] = useState([] as any)
  const [dateAvailable, setDateAvailable] = useState(true)

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
    db.collection("routine")
      .get()
      .then((querySnapshot) => {
        const items = [] as any
        querySnapshot.forEach((doc) => {
          items.push(doc.data())
        })
        setRoutines(items)
      })
    setRefreshing(false)
  }, [db, refreshing])

  useEffect(() => {
    if (checkDateAvailable()) {
      setDateAvailable(true)
      return
    }
    setDateAvailable(false)
  }, [routines, date])

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

  const checkDateAvailable = (): boolean => {
    return (
      routines.filter(
        (data) => convertDate(data.date.toDate()) === convertDate(date)
      ).length === 0
    )
  }

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
    setRefreshing,
    refreshing,
    checkDateAvailable,
    dateAvailable,
  }
}
