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
  ScrollView,
} from "native-base"
import { useRoutine } from "./api/routine"
import { Select } from "../../common/Select"
import CountDownTimer from "../../common/CountDownTimer"
import Exercise from "./Exercise"
import CompleteModal from "./Complete"

export const Routine = () => {
  const [date, setDate] = useState(new Date())
  const [total, setTotal] = useState([] as any)
  const {
    routine,
    editable,
    setEditable,
    onSetReps,
    onSetSets,
    onSetRestTime,
    onSetCompletedSets,
    onSetWeights,
    onChangeCompletedSets,
    getRestTimeSeconds,
    storeTotal,
  } = useRoutine({ date, total, setTotal })
  const [show, setShow] = useState(false)
  const [start, setStart] = useState(false)

  const [openCountDownTimer, setOpenCountDownTimer] = useState(false)
  const [resetTimer, setResetTimer] = useState(true)
  const [openCompleteModal, setOpenCompleteModal] = useState(false)
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
  }

  const showDatepicker = () => {
    setShow(!show)
  }

  const exerciseDetail = (exerciseName: string) => {
    const exerciseIndex = total?.findIndex((i: any) => i.name === exerciseName)
    return total[exerciseIndex]
  }

  return (
    <ScrollView>
      <Flex marginX="2%">
        <Flex>
          <Button onPress={showDatepicker}>
            {show ? "Close Date" : "Select Date"}
          </Button>
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
                  onSetReps={onSetReps}
                  onSetSets={onSetSets}
                  onSetRestTime={onSetRestTime}
                  editable={editable}
                  setEditable={setEditable}
                  setShow={setShow}
                  onSetWeights={onSetWeights}
                  total={exerciseDetail(exercise)}
                />
                <Button
                  bg="yellow.100"
                  onPress={() => {
                    setStart(true)
                    setOpenCountDownTimer(true)
                    onSetCompletedSets(exercise)
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
        <CompleteModal
          total={total}
          setTotal={setTotal}
          openCompleteModal={openCompleteModal}
          setOpenCompleteModal={setOpenCompleteModal}
          onSetReps={onSetReps}
          onSetSets={onSetSets}
          onSetRestTime={onSetRestTime}
          onSetWeights={onSetWeights}
          onChangeCompletedSets={onChangeCompletedSets}
          storeTotal={storeTotal}
        />
        {total.length > 0 && (
          <Button
            bg="yellow.100"
            onPress={() => {
              setOpenCompleteModal(true)
            }}
          >
            COMPLETE
          </Button>
        )}
      </Flex>
    </ScrollView>
  )
}
export default Routine
