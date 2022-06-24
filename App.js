// In App.js in a new project
import React, {useEffect} from "react";
// Redux
import {Provider} from "react-redux";
import store from "./src/redux/store";


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <Provider store={store}>
      <NavigationContainer>
          <MainNavigation />
      </NavigationContainer>
    </Provider>
  )
}

const MainNavigation = () => {
  
  useEffect(() => {
    getSoredCity()
  }, []);
  
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
  return <WelcomeStack />
  // return  city != null ? <DefaultStack /> : <WelcomeStack />
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
