import * as React from "react"
import { Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Database } from "../components/Database/Database"
import { Routine } from "../components/Routine/Routine"

const Tab = createBottomTabNavigator()

export const Footer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Schedule" component={Database} />
        <Tab.Screen name="Routine" component={Routine} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Footer
