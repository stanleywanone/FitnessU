import { Dispatch, useState } from "react"
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
  Input,
} from "native-base"
import { Select } from "../../common/Select"
import {
  restTimeOptions,
  repsOptions,
  setOptions,
  totalOptions,
} from "../../common/TimesOptions"

export interface DateRecordProps {
  onSetReps: (e: string, exercise: string) => void
  onSetSets: (e: string, exercise: string) => void
  onSetRestTime: (e: string, exercise: string) => void
  onSetWeights: (e: any, exercise: string) => void
  getCompletedSets: (exercise: string) => string
  getWeights: (exercise: string) => string
  onChangeCompletedSets: (e: any, exercise: string) => void
  updateTotal: () => void
  total: any
}

export const DateRecord = ({
  onSetReps,
  onSetSets,
  onSetRestTime,
  getCompletedSets,
  onSetWeights,
  getWeights,
  onChangeCompletedSets,
  updateTotal,
  total,
}: DateRecordProps) => {
  const [editable, setEditable] = useState(false)
  return (
    <Flex marginX="2%">
      {total?.length > 0 ? (
        total.map((exercise) => {
          return (
            <Flex key={exercise.name}>
              <Pressable
                onPress={() => setEditable(exercise.name)}
                bgColor="red.100"
              >
                <Text fontSize="2xl">{exercise.name}</Text>
              </Pressable>

              <Flex flexDirection="row">
                <Input
                  isDisabled={editable}
                  w="50%"
                  value={exercise.weights}
                  onChangeText={(e) => onSetWeights(e, exercise.name)}
                  fontSize="xl"
                />
                <Text fontSize="xl">Lbs</Text>
              </Flex>
              <Flex flexDirection="row">
                <Select
                  isDisabled={editable}
                  fontSize="xl"
                  w="50%"
                  options={repsOptions}
                  value={exercise.reps}
                  onValueChange={(e) => {
                    onSetReps(e, exercise.name)
                  }}
                />
                <Text fontSize="xl">Reps</Text>
              </Flex>
              <Flex flexDirection="row">
                <Select
                  isDisabled={editable}
                  fontSize="xl"
                  w="50%"
                  options={setOptions}
                  value={exercise.sets}
                  onValueChange={(e) => {
                    onSetSets(e, exercise.name)
                  }}
                />
                <Text fontSize="xl">Sets</Text>
              </Flex>
              <Flex flexDirection="row">
                <Select
                  isDisabled={editable}
                  fontSize="xl"
                  w="50%"
                  options={restTimeOptions}
                  value={exercise.restTime}
                  onValueChange={(e) => {
                    onSetRestTime(e, exercise.name)
                  }}
                />
                <Text fontSize="xl">Rest Times</Text>
              </Flex>
              <Flex flexDirection="row">
                <Select
                  isDisabled={editable}
                  fontSize="xl"
                  w="50%"
                  options={totalOptions}
                  value={exercise.completedSets}
                  onValueChange={(e) => {
                    onChangeCompletedSets(e, exercise.name)
                  }}
                />
                <Text fontSize="xl">Totals</Text>
              </Flex>
            </Flex>
          )
        })
      ) : (
        <Flex>No data available</Flex>
      )}
      {total.length > 0 && (
        <Button onPress={() => updateTotal()}>Update</Button>
      )}
    </Flex>
  )
}

export default DateRecord
