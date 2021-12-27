import { useState } from "react"
import {
  VStack,
  Heading,
  Select,
  Box,
  Text,
  Flex,
  Button,
  HStack,
  Spacer,
  Pressable,
} from "native-base"
import { useDatabase } from "./api/database"

const SelectOptions = [
  { option: "All" },
  { option: "Chest" },
  { option: "Back" },
  { option: "Shoulder" },
  { option: "Leg" },
]
export const Database = () => {
  const [selectItem, setSelectItem] = useState("All")

  const [collectItems, setCollectItems] = useState([] as any)
  const onCollect = (item: string) => {
    if (collectItems.includes(item)) {
      setCollectItems(collectItems.filter((i: string) => i !== item))
      return
    }
    setCollectItems([...collectItems, item])
  }

  const { database, addRoutine } = useDatabase(selectItem, setCollectItems)

  return (
    <Flex marginY="10%" marginX="5%">
      <VStack bg="red.100" alignItems="center">
        <Heading size="2xl">Traing Database</Heading>
        <HStack justifyContent="space-between">
          <Select
            defaultValue={selectItem}
            selectedValue={selectItem}
            onValueChange={(item) => setSelectItem(item)}
            _selectedItem={{
              bg: "blueGray.300",
            }}
            w="50%"
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
          <Button onPress={() => addRoutine(collectItems)}>Add</Button>
          <Button>Customer</Button>
        </HStack>
      </VStack>
      {database.length > 0 && (
        <Flex
          direction="row"
          flexWrap="wrap"
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          mt="4"
        >
          {database.map((item) => {
            return (
              <Pressable
                onPress={() => {
                  onCollect(item.name)
                }}
              >
                <Box
                  bg={collectItems.includes(item.name) ? "blue.100" : "white"}
                  borderWidth={1}
                  borderColor={
                    collectItems.includes(item.name) ? "blue.100" : "muted.300"
                  }
                  my="1"
                  mr="2"
                  p="1"
                  key={item.name}
                  borderRadius="10"
                >
                  <Text>{item.name}</Text>
                </Box>
              </Pressable>
            )
          })}
        </Flex>
      )}
    </Flex>
  )
}

export default Database