import { useState } from "react"
import {
  FormControl,
  Input,
  Stack,
  WarningOutlineIcon,
  Box,
  Center,
  NativeBaseProvider,
  Flex,
} from "native-base"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <Flex w="70%" alignItems="center" justifyContent="center">
      <FormControl>
        <Stack mx="4">
          <FormControl.Label>Email</FormControl.Label>
          <Input
            placeholder="user@example.com"
            value={email}
            onChangeText={setEmail}
          />
        </Stack>
      </FormControl>
      <FormControl>
        <Stack mx="4">
          <FormControl.Label>Password</FormControl.Label>
          <Input
            type="text"
            placeholder="******"
            value={password}
            onChangeText={setPassword}
          />
        </Stack>
      </FormControl>
    </Flex>
  )
}

export default Login
