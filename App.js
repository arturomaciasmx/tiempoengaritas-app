// In App.js in a new project

import * as React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import CityProvider, { useCity } from "./context/cityProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <CityProvider>
      <NavigationContainer>
          <MainNavigation />
      </NavigationContainer>
    </CityProvider>
  )
}


const MainNavigation = () => {
  const {city} = useCity()
  const {setCity} = useCity()
  
  useEffect(() => {
    getSoredCity()
  }, [city]);
  
  const getSoredCity = async () => {
    try {
        const storedCity = await AsyncStorage.getItem("@city");
      if (storedCity !== null) {
        setCity(storedCity);
      }
    } catch (e) {
      console.log(e);
    }
  }; 
  console.log(city);
  return  city != null ? <DefaultStack /> : <WelcomeStack />
}

const WelcomeStack = () => {  
  return (
      <Stack.Navigator>
        <Stack.Screen name="Selecciona Tu Ciudad" component={WelcomeScreen}/>
      </Stack.Navigator>    
    )
}

const DefaultStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tiempo En Garitas" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default App;
