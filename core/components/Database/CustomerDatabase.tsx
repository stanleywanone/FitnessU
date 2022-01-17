import { useState, FC, Dispatch, SetStateAction } from "react"
import { Text, Flex, Button, Pressable, Modal, Input } from "native-base"
import { Select } from "../../common/Select"
import { SelectOption } from "../../common/TimesOptions"
export interface CustomerDatabaseProps {
  openCustomerDatabase?: boolean
  newDataName?: string
  newDataPostion?: string
  positionOptions?: SelectOption[]
  setNewDataName: Dispatch<SetStateAction<string>>
  setNewDataPostion: Dispatch<SetStateAction<string>>
  setOpenCustomerDatabase: Dispatch<SetStateAction<boolean>>
  addNewData: () => void
}

export const CustomerDatabase: FC<CustomerDatabaseProps> = ({
  openCustomerDatabase,
  newDataName,
  setNewDataName,
  positionOptions,
  newDataPostion,
  setNewDataPostion,
  setOpenCustomerDatabase,
  addNewData,
}) => {
  return (
    <Modal isOpen={openCustomerDatabase}>
      <Modal.Content maxWidth="400px">
        <Modal.Header bgColor="yellow.100">
          <Text fontSize="3xl">Add Customer Data</Text>
        </Modal.Header>
        <Modal.Body mx="3">
          <Text>Name</Text>
          <Input
            placeholder="name..."
            value={newDataName}
            onChangeText={setNewDataName}
            w="100%"
            mb="3"
          />
          <Text>Position</Text>
          <Select
            placeholder="Select Postion..."
            value={newDataPostion}
            options={positionOptions}
            onValueChange={setNewDataPostion}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            w="30%"
            backgroundColor="red.900"
            onPress={() => setOpenCustomerDatabase(!openCustomerDatabase)}
          >
            Cancel
          </Button>
          <Button
            w="30%"
            backgroundColor="red.900"
            onPress={() => addNewData()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}

export default CustomerDatabase
