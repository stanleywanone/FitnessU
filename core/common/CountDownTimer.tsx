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
} from "native-base"

export interface CountDownTimerProps {
  seconds: string
  start: boolean
  resetTimer: boolean
  setResetTimer: Dispatch<SetStateAction<boolean>>
  setStart: Dispatch<SetStateAction<boolean>>
  openCountDownTimer: boolean
  setOpenCountDownTimer: Dispatch<SetStateAction<boolean>>
}

export const CountDownTimer: FC<CountDownTimerProps> = ({
  seconds,
  start,
  resetTimer,
  openCountDownTimer,
  setOpenCountDownTimer,
  setResetTimer,
  setStart,
}) => {
  useEffect(() => {
    if (seconds) onResetTimer()
  }, [seconds])
  const [sec, setSec] = useState(0)

  const startTimer = () => {
    if (sec > 0) {
      setSec(sec - 1)
    }
  }

  const onResetTimer = () => {
    switch (seconds) {
      case "0":
        return setSec(0)
      case "0.5":
        return setSec(5)
      case "1":
        return setSec(60)
      case "1.5":
        return setSec(90)
      case "2.0":
        return setSec(120)
      case "2.5":
        return setSec(150)
      case "3.0":
        return setSec(180)
      case "3.5":
        return setSec(210)
      case "4.0":
        return setSec(240)
    }
  }

  useEffect(() => {
    if (start && sec > 0) {
      const interval = setInterval(() => {
        startTimer()
      }, 1000)
      return () => clearInterval(interval)
    }
    if (sec === 0) {
      setOpenCountDownTimer(false)
    }
  }, [sec, start, resetTimer])

  useEffect(() => {
    if (!openCountDownTimer) {
      setStart(false)
      onResetTimer()
    }
  }, [openCountDownTimer])

  return (
    <Flex flexDir="row">
      <Modal isOpen={openCountDownTimer && sec !== 0} bgColor="white">
        <Text fontSize="8xl">
          0{Math.floor(sec / 60)} : {sec % 60 > 9 ? sec % 60 : "0" + (sec % 60)}
        </Text>

        <Button.Group
          colorScheme="blue"
          mx={{
            base: "auto",
            md: 0,
          }}
          size="sm"
        >
          <Button
            onPress={() => {
              setStart(!start)
            }}
          >
            {start ? "PAUSE" : "RESUME"}
          </Button>
          <Button
            onPress={() => {
              onResetTimer()
            }}
          >
            RESET
          </Button>
        </Button.Group>
      </Modal>
    </Flex>
  )
}

export default CountDownTimer
