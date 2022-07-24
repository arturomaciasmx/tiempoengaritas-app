import 'expo-dev-client';
import React, {useEffect} from "react";
import "react-native-gesture-handler";
// redux
import store from "./src/redux/store";
import {Provider, useDispatch, useSelector} from "react-redux";
// navigator
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { currentCity, setCurrentCity } from "./src/redux/citiesSlice";
// navigations
import DefaultDrawer from './navigation/DefaultDrawer';
import WelcomeStack from './navigation/WelcomeStack';





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

  return  !_currentCity ? <WelcomeStack /> : <DefaultDrawer />;
}




export default App;
