// In App.js in a new project

import * as React from "react";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import CityProvider, { useCity } from "./context/cityProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";


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
  return  city != null ? <DefaultStack /> : <WelcomeStack />
}

const WelcomeStack = () => {
  const {cities} = useCity();
  
  if (cities.length > 0) return (
      <Stack.Navigator>
        <Stack.Screen name="Selecciona Tu Ciudad">
          {props => <WelcomeScreen {...props} cities={cities} />}
        </Stack.Screen>
      </Stack.Navigator>    
    )
  return <Text>Loading...</Text>
}

const DefaultStack = () => {
  const {cities} = useCity();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tiempo En Garitas">
          {props => <HomeScreen {...props} cities={cities} />}
        </Stack.Screen>
    </Stack.Navigator> 
  )
}

export default App;
