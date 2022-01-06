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
  onSetReps: (e: string, exercise: string) => void
  onSetSets: (e: string, exercise: string) => void
  onSetRestTime: (e: string, exercise: string) => void
  editable: string
  onSetWeights: (e: any, exercise: string) => void
  setEditable: Dispatch<SetStateAction<string>>
  setShow: Dispatch<SetStateAction<boolean>>
  total: any
}

export const Exercise: FC<ExerciseProps> = ({
  exercise,
  onSetReps,
  onSetSets,
  onSetRestTime,
  editable,
  setEditable,
  onSetWeights,
  setShow,
  total,
}) => {
  console.log("total, ", total)
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
          total:{total?.completedSets || "0"}
        </Text>
      </Pressable>

      <Flex flexDirection="row" alignItems="center">
        <Input
          isDisabled={editable !== exercise}
          placeholder="0"
          minWidth="70%"
          value={total?.weights}
          onChangeText={(e) => {
            onSetWeights(e, exercise)
          }}
        />
        <Text>Lbs</Text>
      </Flex>

      <Flex flexDirection="row" alignItems="center">
        <Select
          isDisabled={editable !== exercise}
          options={repsOptions}
          value={total?.reps || "0"}
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
          value={total?.sets || "0"}
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
          value={total?.restTime || "0"}
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
