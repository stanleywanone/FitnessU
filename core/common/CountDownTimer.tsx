import { useEffect, useState, FC } from "react"
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
}

export const CountDownTimer: FC<CountDownTimerProps> = ({ seconds }) => {
  const [sec, setSec] = useState(0)
  const [min, setMin] = useState(0)

  const startTimer = () => {
    if (sec > 0) {
      setSec(sec - 1)
    }
  }

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      startTimer()
    }, 1000)
    return () => clearInterval(interval)
  }, [sec])

  return (
    <Flex flexDir="row">
      <Text>
        {Math.floor(sec / 60)} minutes {sec % 60} seconds
      </Text>
    </Flex>
  )
}

export default CountDownTimer
