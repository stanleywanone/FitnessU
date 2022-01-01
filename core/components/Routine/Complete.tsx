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

export interface CompleteProps {
  openCompleteModal: boolean
  setOpenCompleteModal: Dispatch<SetStateAction<boolean>>
  total: any
  setTotal: Dispatch<SetStateAction<any>>
}

export const CompleteModal: FC<CompleteProps> = ({
  openCompleteModal,
  setOpenCompleteModal,
  total,
  setTotal,
}) => {
  console.log("total, ", total)
  return (
    <Flex flexDir="row">
      <Modal isOpen={openCompleteModal} bgColor="white">
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Complete</Modal.Header>
          <Modal.Body>
            {total.map((exercise) => {
              return (
                <FormControl>
                  <FormControl.Label>{exercise.name}</FormControl.Label>
                  <Flex flexDirection="row">
                    <Input w="50%" value={exercise.weights} />
                    Lbs
                  </Flex>
                  <Flex flexDirection="row">
                    <Input w="50%" value={exercise.reps} />
                    Reps
                  </Flex>
                  <Flex flexDirection="row">
                    <Input w="50%" value={exercise.sets} />
                    Sets
                  </Flex>
                  <Flex flexDirection="row">
                    <Input w="50%" value={exercise.restTime} />
                    Rest Times
                  </Flex>
                  <Flex flexDirection="row">
                    <Input w="50%" value={exercise.completedSets} />
                    Totals
                  </Flex>
                </FormControl>
              )
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setOpenCompleteModal(false)
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setOpenCompleteModal(false)
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Flex>
  )
}

export default CompleteModal
