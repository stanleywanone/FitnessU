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
  const [total, setTotal] = useState([] as any)
  const { routine } = useRoutine(date)
  const [show, setShow] = useState(false)
  const [start, setStart] = useState(false)
  const [editable, setEditable] = useState("")
  const [resetTimer, setResetTimer] = useState(true)

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
  }

  const onSetReps = (e: string, exerciseName: string) => {
    const exerciseIndex = total.findIndex((i: any) => i.name === exerciseName)

    if (exerciseIndex > -1) {
      setTotal([
        ...total.slice(0, exerciseIndex),
        { ...total[exerciseIndex], reps: e },
        ...total.slice(exerciseIndex + 1),
      ])
      return
    }
    setTotal([...total, { name: exerciseName, reps: e }])
  }

  const onSetSets = (e: string, exerciseName: string) => {
    const exerciseIndex = total.findIndex((i: any) => i.name === exerciseName)

    if (exerciseIndex > -1) {
      setTotal([
        ...total.slice(0, exerciseIndex),
        { ...total[exerciseIndex], sets: e },
        ...total.slice(exerciseIndex + 1),
      ])
      return
    }
    setTotal([...total, { name: exerciseName, sets: e }])
  }

  const onSetRestTime = (e: string, exerciseName: string) => {
    const exerciseIndex = total.findIndex((i: any) => i.name === exerciseName)

    if (exerciseIndex > -1) {
      console.log("already, ")
      setTotal([
        ...total.slice(0, exerciseIndex),
        { ...total[exerciseIndex], restTime: e },
        ...total.slice(exerciseIndex + 1),
      ])
      return
    }
    console.log("create new, ")
    setTotal([...total, { name: exerciseName, restTime: e }])
  }

  const showDatepicker = () => {
    setShow(!show)
  }

  const getReps = (exercise: string) => {
    const index = total.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].reps) return total[index].reps
    return "0"
  }

  const getSets = (exercise: string) => {
    const index = total.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].sets) return total[index].sets
    return "0"
  }

  const getRestTime = (exercise: string) => {
    const index = total.findIndex((i: any) => i.name === exercise)
    if (index > -1 && total[index].restTime) return total[index].restTime
    return "0"
  }

  const getRestTimeSeconds = useMemo(() => {
    const index = total.findIndex((i: any) => i.name === editable)
    if (index > -1) return total[index].restTime
    return "0"
  }, [editable, total])

  return (
    <Flex marginY="10%" marginX="5%">
      <VStack bg="red.100" alignItems="center">
        <Heading size="2xl">Routine</Heading>
      </VStack>
      <Flex>
        <Button onPress={showDatepicker}>Select Date</Button>
      </Flex>
      {show && <DateTimePicker value={date} onChange={onChange} />}
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
              <Button bg="yellow.100" onPress={() => setStart(!start)}>
                {start && editable === exercise ? "PAUSE" : "START"}
              </Button>
              <Button bg="yellow.100" onPress={() => setResetTimer(true)}>
                Reset
              </Button>
            </Flex>
          )
        })}
      <CountDownTimer
        seconds={getRestTimeSeconds}
        start={start}
        resetTimer={resetTimer}
        setResetTimer={setResetTimer}
      />
    </Flex>
  )
}
export default Routine
