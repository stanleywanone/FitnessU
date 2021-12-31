import { useEffect, useState, useMemo, useCallback } from "react"
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
  Spacer,
  Pressable,
  Center,
} from "native-base"
import { useRoutine } from "./api/routine"
import { Select } from "../../common/Select"
import CountDownTimer from "../../common/CountDownTimer"
import Exercise from "./Exercise"

export const Routine = () => {
  const [date, setDate] = useState(new Date())
  const {
    routine,
    total,
    editable,
    setEditable,
    onSetReps,
    onSetSets,
    onSetRestTime,
    getReps,
    getSets,
    getRestTime,
    getRestTimeSeconds,
  } = useRoutine(date)
  const [show, setShow] = useState(false)
  const [start, setStart] = useState(false)
  const [openCountDownTimer, setOpenCountDownTimer] = useState(false)
  const [resetTimer, setResetTimer] = useState(true)

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
  }

  const showDatepicker = () => {
    setShow(!show)
  }

  return (
    <Flex marginY="10%" marginX="5%">
      <VStack bg="red.100" alignItems="center">
        <Heading size="2xl">Routine</Heading>
      </VStack>
      <Flex>
        <Button onPress={showDatepicker}>Select Date</Button>
      </Flex>
      {show && (
        <DateTimePicker value={date} onChange={onChange} display="spinner" />
      )}
      {routine.length > 0 &&
        routine.map((exercise: string) => {
          return (
            <Flex key={exercise} flexDir="row">
              <Exercise
                exercise={exercise}
                reps={getReps(exercise)}
                onSetReps={onSetReps}
                sets={getSets(exercise)}
                onSetSets={onSetSets}
                restTime={getRestTime(exercise)}
                onSetRestTime={onSetRestTime}
                editable={editable}
                setEditable={setEditable}
              />
              <Button
                bg="yellow.100"
                onPress={() => {
                  setStart(true)
                  setOpenCountDownTimer(true)
                }}
                isDisabled={editable !== exercise}
              >
                START
              </Button>
            </Flex>
          )
        })}
      <CountDownTimer
        openCountDownTimer={openCountDownTimer}
        setOpenCountDownTimer={setOpenCountDownTimer}
        seconds={getRestTimeSeconds}
        start={start}
        setStart={setStart}
        resetTimer={resetTimer}
        setResetTimer={setResetTimer}
      />
    </Flex>
  )
}
export default Routine
