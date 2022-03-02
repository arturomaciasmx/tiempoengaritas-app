// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import CityProvider, { useCity } from "./context/cityProvider";

const Stack = createNativeStackNavigator();

function App() {

  
  return (
    <CityProvider>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </CityProvider>
  );
}

const MainNavigation = () => {
  const {city} = useCity()
  return  city != null ? <DefaultStack /> : <WelcomeStack />
}

const WelcomeStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ title: "Selecciona Tu Ciudad" }}
        />
      </Stack.Navigator>    
    )
}

const DefaultStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator> 
  )
}

export default App;
