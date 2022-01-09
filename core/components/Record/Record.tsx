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
import { PositionRecord } from "./PositionRecord"

const partOptions = [
  { value: "Chest", label: "Chest" },
  { value: "Back", label: "Back" },
  { value: "Shoulder", label: "Shoulder" },
  { value: "Leg", label: "Leg" },
]
export const Record = () => {
  const [total, setTotal] = useState({} as any)
  const [part, setPart] = useState("All")
  const [position, setPosition] = useState("")
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)

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
    onSetWeights,
    onChangeCompletedSets,
    updateTotal,
    setTypeLog,
    typeLog,
    exerciseOptions,
  } = useRecord({ total, setTotal, date, position, part })

  return (
    <ScrollView>
      <Flex marginX="2%">
        <Flex flexDirection="row">
          <Flex w="50%">
            <Button
              onPress={() => {
                showDatepicker()
                setTypeLog("date")
              }}
              w="full"
            >
              {show ? "Close Date" : "Select Date"}
            </Button>
          </Flex>
          <Flex w="50%">
            <Select
              w="full"
              options={partOptions}
              value={part}
              onValueChange={(e) => {
                // setTypeLog("position")
                setPart(e)
              }}
              placeholder="select part"
            />
            <Select
              w="full"
              options={exerciseOptions}
              value={position}
              onValueChange={(e) => {
                setTypeLog("position")
                setPosition(e)
              }}
              placeholder="select position"
            />
          </Flex>
        </Flex>
        {show && (
          <DateTimePicker value={date} onChange={onChange} display="spinner" />
        )}
        {typeLog === "date" && (
          <DateRecord
            onSetReps={onSetReps}
            onSetSets={onSetSets}
            onSetRestTime={onSetRestTime}
            onSetWeights={onSetWeights}
            onChangeCompletedSets={onChangeCompletedSets}
            updateTotal={updateTotal}
            total={total.data}
          />
        )}
        {typeLog === "position" && (
          <PositionRecord position={position} total={total} />
        )}
      </Flex>
    </ScrollView>
  )
}

export default Record
