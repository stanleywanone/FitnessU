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
  Spacer,
  Pressable,
  Center,
} from "native-base"
import { useRoutine } from "./api/routine"
import { Select } from "../../common/Select"
import CountDownTimer from "../../common/CountDownTimer"

export const Routine = () => {
  const [date, setDate] = useState(new Date())
  const { routine } = useRoutine(date)
  const [show, setShow] = useState(false)
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
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
        routine.map((exercise: string) => {
          return (
            <Flex key={exercise} flexDir="row">
              {/* <HStack alignContent="space-evenly"> */}
              <Center bg="red.100">{exercise}</Center>
              <Select
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "1" },
                ]}
                value={reps}
                onValueChange={setReps}
              ></Select>
              <Select
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "1" },
                ]}
                value={reps}
                onValueChange={setReps}
              ></Select>
              <Select
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "1" },
                ]}
                value={reps}
                onValueChange={setReps}
              ></Select>
              <Button bg="yellow.100">START</Button>
              {/* </HStack> */}
            </Flex>
          )
        })}
      <CountDownTimer seconds="3.0" />
    </Flex>
  )
}
export default Routine
