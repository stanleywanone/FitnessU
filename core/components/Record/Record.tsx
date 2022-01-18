import { useState } from "react"
import { Platform, RefreshControl } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Flex, Button, ScrollView, Pressable, Text } from "native-base"
import { Select } from "../../common/Select"
import { useRecord } from "./api/useRecord"
import DateRecord from "./DateRecord"
import { PositionRecord } from "./PositionRecord"
import { convertDateToString } from "../utilis/date"

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
    setShow(!show)
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
    setRefreshing,
    refreshing,
  } = useRecord({ total, setTotal, date, position, part })

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
    >
      <Flex marginX="2%">
        <Flex>
          <Pressable
            onPress={() => {
              showDatepicker()
              setTypeLog("date")
            }}
          >
            <Flex
              backgroundColor="blue.200"
              justifyContent="center"
              flexDirection="row"
            >
              <Text>Select Date</Text>
              <Text position="absolute" right="0">
                {convertDateToString(date)}
              </Text>
            </Flex>
          </Pressable>
        </Flex>
        <Flex flexDirection="row">
          <Flex w="50%">
            <Select
              options={partOptions}
              value={part}
              onValueChange={(e) => {
                setPart(e)
              }}
              placeholder="select part"
            />
          </Flex>
          <Flex w="50%">
            <Select
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
