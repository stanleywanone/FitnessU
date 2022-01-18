import { useEffect, useState } from "react"
import { Platform, RefreshControl } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import {
  VStack,
  Box,
  Text,
  Flex,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Alert,
  IconButton,
  CloseIcon,
} from "native-base"
import { useDatabase } from "./api/database"
import { Select } from "../../common/Select"
import CustomerDatabase from "./CustomerDatabase"
import { convertDateToString } from "../utilis/date"

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

    setShow(!show)
  }

  const showDatepicker = () => {
    setShow(!show)
  }

  const {
    database,
    addRoutine,
    positionOptions,
    openCustomerDatabase,
    setOpenCustomerDatabase,
    newDataName,
    newDataPostion,
    setNewDataPostion,
    setNewDataName,
    addNewData,
    setRefreshing,
    refreshing,
    dateAvailable,
  } = useDatabase(selectItem, setCollectItems, date)

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
        />
      }
    >
      <Flex marginX="2%">
        {!dateAvailable && (
          <Alert w="100%" status="warning">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md">The date is already be choosed!</Text>
              </HStack>
            </VStack>
          </Alert>
        )}

        <Flex flexDirection="row" backgroundColor="red.100">
          <Button
            w="50%"
            onPress={() => addRoutine(collectItems)}
            backgroundColor="red.900"
            color="black"
            isDisabled={!dateAvailable}
          >
            Add
          </Button>
          <Button
            w="50%"
            backgroundColor="red.900"
            color="black"
            onPress={() => setOpenCustomerDatabase(!openCustomerDatabase)}
          >
            Customer
          </Button>
          <CustomerDatabase
            openCustomerDatabase={openCustomerDatabase}
            newDataName={newDataName}
            setNewDataName={setNewDataName}
            newDataPostion={newDataPostion}
            positionOptions={positionOptions}
            setNewDataPostion={setNewDataPostion}
            setOpenCustomerDatabase={setOpenCustomerDatabase}
            addNewData={addNewData}
          />
        </Flex>
        <Flex>
          <Pressable onPress={showDatepicker}>
            <Flex
              backgroundColor="blue.200"
              justifyContent="center"
              flexDirection="row"
            >
              <Text>Select Date</Text>
              <Text position="absolute" right="0">
                {convertDateToString(date)}
              </Text>
            </Flex>
          </Pressable>
        </Flex>
        <Flex>
          <Select
            placeholder="Select Postion..."
            value={selectItem}
            options={positionOptions}
            onValueChange={(item) => setSelectItem(item)}
            w="100%"
          />
        </Flex>
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
                      collectItems.includes(item.name)
                        ? "blue.100"
                        : "muted.300"
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
        {show && (
          <DateTimePicker value={date} onChange={onChange} display="spinner" />
        )}
      </Flex>
    </ScrollView>
  )
}

export default Database
