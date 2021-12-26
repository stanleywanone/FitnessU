import { useState } from "react"
import { VStack, Heading, Select } from "native-base"
import { useGetDatabase } from "./api/get"

const SelectOptions = [
  { option: "All" },
  { option: "Chest" },
  { option: "Back" },
  { option: "Shoulder" },
  { option: "Leg" },
]
export const Database = () => {
  const [selectItem, setSelectItem] = useState("")
  const { database } = useGetDatabase()

  return (
    <VStack bg="red.100" margin="10%">
      <Heading size="2xl">Traing Database</Heading>
      <Select
        selectedValue={selectItem}
        onValueChange={(item) => setSelectItem(item)}
        _selectedItem={{
          bg: "blueGray.300",
        }}
      >
        {database.length > 0 ? (
          SelectOptions.map((item) => {
            return (
              <Select.Item
                key={item.option}
                label={item.option}
                value={item.option}
              />
            )
          })
        ) : (
          <Select.Item label={""} value={""} />
        )}
      </Select>
    </VStack>
  )
}

export default Database
