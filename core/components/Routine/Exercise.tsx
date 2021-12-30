import { useEffect, useState, FC, Dispatch, SetStateAction } from "react"
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
import {
  restTimeOptions,
  repsOptions,
  setOptions,
} from "../../common/TimesOptions"
import { Icon } from "native-base"
import { Feather } from "@expo/vector-icons"

export interface ExerciseProps {
  exercise: string
  reps: string
  onSetReps: (e: string, exercise: string) => void
  sets: string
  onSetSets: (e: string, exercise: string) => void
  restTime: string
  onSetRestTime: (e: string, exercise: string) => void
  editable: string
  setEditable: Dispatch<SetStateAction<string>>
}

export const Exercise: FC<ExerciseProps> = ({
  exercise,
  reps,
  onSetReps,
  sets,
  onSetSets,
  restTime,
  onSetRestTime,
  editable,
  setEditable,
}) => {
  return (
    <Flex key={exercise} flexDir="row">
      <Pressable onPress={() => setEditable(exercise)}>
        <Center bg="red.100" h="10">
          {exercise}
        </Center>
      </Pressable>

      <Select
        isDisabled={editable !== exercise}
        options={repsOptions}
        value={reps}
        onValueChange={(e) => {
          onSetReps(e, exercise)
        }}
      ></Select>
      <Select
        isDisabled={editable !== exercise}
        options={setOptions}
        value={sets}
        onValueChange={(e) => {
          onSetSets(e, exercise)
        }}
      ></Select>
      <Select
        isDisabled={editable !== exercise}
        options={restTimeOptions}
        value={restTime}
        onValueChange={(e) => {
          onSetRestTime(e, exercise)
        }}
      ></Select>
    </Flex>
  )
}

export default Exercise
