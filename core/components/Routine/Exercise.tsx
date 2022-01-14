import { FC, Dispatch, SetStateAction } from "react"
import { Text, Flex, Pressable, Center } from "native-base"
import { Select } from "../../common/Select"
import {
  weightOptions,
  restTimeOptions,
  repsOptions,
  setOptions,
} from "../../common/TimesOptions"

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
          total:{total?.completedSets}
        </Text>
      </Pressable>

      <Flex flexDirection="row" alignItems="center">
        <Select
          isDisabled={editable !== exercise}
          options={weightOptions}
          value={total?.weights}
          onValueChange={(e) => {
            onSetWeights(e, exercise)
          }}
        />
        <Text>Lbs</Text>
      </Flex>

      <Flex flexDirection="row" alignItems="center">
        <Select
          isDisabled={editable !== exercise}
          options={repsOptions}
          value={total?.reps}
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
          value={total?.sets}
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
          value={total?.restTime}
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
