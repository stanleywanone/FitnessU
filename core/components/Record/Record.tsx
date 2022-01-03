import { useState } from "react"
import { Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import {
  VStack,
  Heading,
  Box,
  Text,
  Flex,
  Button,
  HStack,
  Pressable,
  Modal,
  ScrollView,
} from "native-base"
import { Select } from "../../common/Select"
import { useRecord } from "./api/useRecord"
import DateRecord from "./DateRecord"

const positionOptions = [
  { value: "Chest", label: "Chest" },
  { value: "Back", label: "Back" },
  { value: "Shoulder", label: "Shoulder" },
  { value: "Leg", label: "Leg" },
]
export const Record = () => {
  const [total, setTotal] = useState({} as any)
  const [position, setPosition] = useState("")
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [collectItems, setCollectItems] = useState([] as any)
  const onCollect = (item: string) => {
    if (collectItems.includes(item)) {
      setCollectItems(collectItems.filter((i: string) => i !== item))
      return
    }
    setCollectItems([...collectItems, item])
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
  }

  const showDatepicker = () => {
    setShow(!show)
  }

  const {
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
  } = useRecord({ total, setTotal, date })
  console.log("total, ", total)

  return (
    <ScrollView>
      <Flex marginX="2%">
        <Flex flexDirection="row">
          <Flex w="50%">
            <Button onPress={showDatepicker} w="full">
              {show ? "Close Date" : "Select Date"}
            </Button>
          </Flex>
          <Flex w="50%">
            <Select
              w="full"
              options={positionOptions}
              value={position}
              onValueChange={setPosition}
              placeholder="select position"
            />
          </Flex>
        </Flex>
        {show && (
          <DateTimePicker value={date} onChange={onChange} display="spinner" />
        )}
        <DateRecord
          onSetReps={onSetReps}
          onSetSets={onSetSets}
          onSetRestTime={onSetRestTime}
          getCompletedSets={getCompletedSets}
          onSetWeights={onSetWeights}
          getWeights={getWeights}
          onChangeCompletedSets={onChangeCompletedSets}
          total={total.data}
        />
      </Flex>
    </ScrollView>
  )
}

export default Record
