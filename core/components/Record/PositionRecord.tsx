import { VStack, Box, Text, Flex } from "native-base"

export interface PositionRecordProps {
  position: string
  total: any
}

export const PositionRecord = ({ position, total }: PositionRecordProps) => {
  return (
    <Flex marginY="2%">
      {total.length > 0 ? (
        total.map((exercise) => {
          return (
            <VStack key={exercise.date}>
              <Box bgColor="yellow.100" borderWidth="1" paddingX="1">
                <Text fontSize="2xl">{exercise.date}</Text>
              </Box>
              <Box>
                <Text fontSize="2xl" borderWidth="1" paddingX="1">
                  {exercise.data.weights} Lbs
                </Text>
              </Box>
              <Box>
                <Text fontSize="2xl" borderWidth="1" paddingX="1">
                  {exercise.data.reps} Reps
                </Text>
              </Box>
              <Box>
                <Text fontSize="2xl" borderWidth="1" paddingX="1">
                  {exercise.data.completedSets} Sets
                </Text>
              </Box>
            </VStack>
          )
        })
      ) : (
        <Flex>No data available</Flex>
      )}
    </Flex>
  )
}
