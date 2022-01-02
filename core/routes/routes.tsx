import * as React from "react"
import { Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Database } from "../components/Database/Database"
import { Routine } from "../components/Routine/Routine"

const Tab = createBottomTabNavigator()

const screenOptions = {
  tabBarStyle: {
    backgroundColor: "#8B0000",
  },
}

const tabOptions = {
  tabBarLabelStyle: {
    fontSize: 16,
  },
  tabBarInactiveTintColor: "gray",
  tabBarActiveTintColor: "white",
}
export const Routes = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator {...{ screenOptions }}>
        <Tab.Screen
          name="Schedule"
          component={Database}
          options={{ ...tabOptions }}
        />
        <Tab.Screen
          name="Routine"
          component={Routine}
          options={{ ...tabOptions }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Routes
