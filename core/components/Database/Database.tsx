import { useState } from "react"
import { Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { VStack, Box, Text, Flex, Button, HStack, Pressable } from "native-base"
import { useDatabase } from "./api/database"
import { Select } from "../../common/Select"

export const Database = () => {
  const [selectItem, setSelectItem] = useState("All")
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [collectItems, setCollectItems] = useState([] as any)
  const onCollect = (item: string) => {
    if (collectItems.includes(item)) {
      setCollectItems(collectItems.filter((i: string) => i !== item))
      return
    }
    setCollectItems([...collectItems, item])
  }

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
  }

  const showDatepicker = () => {
    setShow(!show)
  }

  const { database, addRoutine } = useDatabase(
    selectItem,
    setCollectItems,
    date
  )

  console.log("date, ", date)

  return (
    <Flex marginX="2%">
      <VStack bg="red.100" alignItems="center">
        <HStack justifyContent="space-between">
          {database.length > 0 && (
            <Select
              placeholder="--"
              value={selectItem}
              onValueChange={(item) => setSelectItem(item)}
              w="50%"
            />
          )}
          <Button onPress={() => addRoutine(collectItems)}>Add</Button>
          <Button>Customer</Button>
        </HStack>
      </VStack>
      <Flex>
        <Button onPress={showDatepicker}>Select Date</Button>
      </Flex>
      {show && <DateTimePicker value={date} onChange={onChange} />}
      {database.length > 0 && (
        <Flex
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-start"
          alignItems="flex-start"
          mt="4"
        >
          {database.map((item) => {
            return (
              <Pressable
                key={item.name}
                onPress={() => {
                  onCollect(item.name)
                }}
              >
                <Box
                  key={item.name}
                  bg={collectItems.includes(item.name) ? "blue.100" : "white"}
                  borderWidth="1"
                  borderColor={
                    collectItems.includes(item.name) ? "blue.100" : "muted.300"
                  }
                  my="1"
                  mr="2"
                  p="1"
                  borderRadius="10"
                >
                  <Text key={item.name}>{item.name}</Text>
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
