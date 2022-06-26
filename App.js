// In App.js in a new project
import React, {useEffect} from "react";
// Redux
import store from "./src/redux/store";
import {Provider, useDispatch, useSelector} from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { currentCity, setCurrentCity } from "./src/redux/citiesSlice";

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
  const _currentCity = useSelector(currentCity);
  const dispatch = useDispatch();

  useEffect(() => {
    getSoredCity();
  }, [_currentCity]);
  
  const getSoredCity = async () => {
    try {
        const storedCity = await AsyncStorage.getItem("@city");
      if (storedCity !== null) {
        dispatch(setCurrentCity(storedCity));
      }
    } catch (e) {
      console.log(e);
    }
  }; 
  console.log(_currentCity);
  
  return  !_currentCity ? <WelcomeStack /> : <DefaultStack />;
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
