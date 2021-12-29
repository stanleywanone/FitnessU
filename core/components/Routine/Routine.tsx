import { useEffect, useState } from "react"
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
  const [resetTimer, setResetTimer] = useState(true)
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
  }
  useEffect(() => {
    const routineLength = routine.length
    const total = Array
  }, [])

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
    setTotal([...total, { name: exerciseName, reps: e }])
  }

  const onSetRestTime = (e: string, exerciseName: string) => {
    const exerciseIndex = total.findIndex((i: any) => i.name === exerciseName)

    if (exerciseIndex > -1) {
      setTotal([
        ...total.slice(0, exerciseIndex),
        { ...total[exerciseIndex], resetTime: e },
        ...total.slice(exerciseIndex + 1),
      ])
      return
    }
    setTotal([...total, { name: exerciseName, reps: e }])
  }

  const showDatepicker = () => {
    setShow(!show)
  }

  const [reps, setReps] = useState("1")
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
        routine.map((exercise: string, index: number) => {
          return (
            <Flex key={exercise} flexDir="row">
              <Text>Index {index}</Text>
              <Exercise
                exercise={exercise}
                reps={total[index]?.reps || "0"}
                onSetReps={onSetReps}
                sets={total[index]?.sets || "0"}
                onSetSets={onSetSets}
                restTime={total[index]?.resetTime || "0"}
                onSetRestTime={onSetRestTime}
              />
              <Button bg="yellow.100" onPress={() => setStart(!start)}>
                START
              </Button>
              <Button bg="yellow.100" onPress={() => setResetTimer(true)}>
                Reset
              </Button>
            </Flex>
          )
        })}
      <CountDownTimer
        seconds="0.5"
        start={start}
        resetTimer={resetTimer}
        setResetTimer={setResetTimer}
      />
    </Flex>
  )
}
export default Routine
