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
} from "native-base"

export interface CountDownTimerProps {
  seconds: string
  start: boolean
  resetTimer: boolean
  setResetTimer: Dispatch<SetStateAction<boolean>>
}

export const CountDownTimer: FC<CountDownTimerProps> = ({
  seconds,
  start,
  resetTimer,
  setResetTimer,
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
      case "0.5":
        return setSec(30)
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
    }
  }

  useEffect(() => {
    if (resetTimer) {
      onResetTimer()
      setResetTimer(false)
    }
    if (start && sec > 0) {
      const interval = setInterval(() => {
        startTimer()
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [sec, start, resetTimer])

  return (
    <Flex flexDir="row">
      <Text>
        {Math.floor(sec / 60)} minutes {sec % 60} seconds
      </Text>
    </Flex>
  )
}

export default CountDownTimer
