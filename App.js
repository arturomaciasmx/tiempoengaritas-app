// In App.js in a new project

import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen"
import WelcomeScreen from "./screens/WelcomeScreen"

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: "Selecciona Tu Ciudad" }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      {/* <HomeScreen /> */}
    </NavigationContainer>
  )
}

export default App
