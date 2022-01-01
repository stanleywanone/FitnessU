import { useEffect, useState, FC, Dispatch, SetStateAction } from "react"
import { Platform, TextInput } from "react-native"
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
  Input,
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
  onSetWeights: (e: any, exercise: string) => void
  setEditable: Dispatch<SetStateAction<string>>
  getCompletedSets: (exercise: string) => string
  getWeights: (exercise: string) => string
  setShow: Dispatch<SetStateAction<boolean>>
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
  getCompletedSets,
  onSetWeights,
  setShow,
  getWeights,
}) => {
  return (
    <Flex key={exercise}>
      <Pressable
        onPress={() => {
          setEditable(exercise)
          setShow(false)
        }}
      >
        <Center bg="red.100" h="10">
          {exercise}
        </Center>
        <Text position="absolute" right="0" bottom="0">
          total:{getCompletedSets(exercise)}
        </Text>
      </Pressable>

      <Flex flexDirection="row" alignItems="center">
        <Input
          placeholder="0"
          minWidth="70%"
          value={getWeights(exercise)}
          onChange={(e) => {
            onSetWeights(e, exercise)
          }}
        />
        <Text>Lbs</Text>
      </Flex>

      <Flex flexDirection="row" alignItems="center">
        <Select
          isDisabled={editable !== exercise}
          options={repsOptions}
          value={reps}
          onValueChange={(e) => {
            onSetReps(e, exercise)
          }}
        />
        <Text>Reps</Text>
      </Flex>

      <Flex flexDirection="row" alignItems="center">
        <Select
          isDisabled={editable !== exercise}
          options={setOptions}
          value={sets}
          onValueChange={(e) => {
            onSetSets(e, exercise)
          }}
        />
        <Text>Sets</Text>
      </Flex>
      <Flex flexDirection="row" alignItems="center">
        <Select
          isDisabled={editable !== exercise}
          options={restTimeOptions}
          value={restTime}
          onValueChange={(e) => {
            onSetRestTime(e, exercise)
          }}
        />
        <Text justifyContent="center">RestTime</Text>
      </Flex>
    </Flex>
  )
}

export default Exercise
