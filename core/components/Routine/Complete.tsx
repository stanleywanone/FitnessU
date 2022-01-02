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
  Modal,
  FormControl,
  Input,
} from "native-base"
import { Select } from "../../common/Select"
import {
  restTimeOptions,
  repsOptions,
  setOptions,
  totalOptions,
} from "../../common/TimesOptions"

export interface CompleteProps {
  openCompleteModal: boolean
  setOpenCompleteModal: Dispatch<SetStateAction<boolean>>
  total: any
  setTotal: Dispatch<SetStateAction<any>>
  onSetReps: (e: string, exercise: string) => void
  onSetSets: (e: string, exercise: string) => void
  onSetRestTime: (e: string, exercise: string) => void
  onSetWeights: (e: string, exercise: string) => void
  onChangeCompletedSets: (e: string, exercise: string) => void
  storeTotal: (total: any) => void
}

export const CompleteModal: FC<CompleteProps> = ({
  openCompleteModal,
  setOpenCompleteModal,
  total,
  setTotal,
  onSetReps,
  onSetSets,
  onSetRestTime,
  onSetWeights,
  onChangeCompletedSets,
  storeTotal,
}) => {
  const [editable, setEditable] = useState("")

  return (
    <Flex flexDir="row">
      <Modal isOpen={openCompleteModal} bgColor="white">
        <Modal.Content maxWidth="400px">
          <Modal.Header bgColor="yellow.100">
            <Text fontSize="3xl">Complete</Text>
          </Modal.Header>
          <Modal.Body>
            {total.length > 0 ? (
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
                        isDisabled={editable !== exercise.name}
                        w="50%"
                        value={exercise.weights}
                        onChangeText={(e) => onSetWeights(e, exercise.name)}
                        fontSize="xl"
                      />
                      <Text fontSize="xl">Lbs</Text>
                    </Flex>
                    <Flex flexDirection="row">
                      <Select
                        isDisabled={editable !== exercise.name}
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
                        isDisabled={editable !== exercise.name}
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
                        isDisabled={editable !== exercise.name}
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
                        isDisabled={editable !== exercise.name}
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
          </Modal.Body>
          <Modal.Footer>
            {total.length > 0 ? (
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setOpenCompleteModal(false)
                  }}
                >
                  <Text fontSize="xl">Cancel</Text>
                </Button>
                <Button
                  onPress={() => {
                    storeTotal(total)
                    setOpenCompleteModal(false)
                  }}
                >
                  <Text fontSize="xl">Save</Text>
                </Button>
              </Button.Group>
            ) : (
              <Button
                onPress={() => {
                  setOpenCompleteModal(false)
                }}
              >
                <Text fontSize="xl">Back</Text>
              </Button>
            )}
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Flex>
  )
}

export default CompleteModal
