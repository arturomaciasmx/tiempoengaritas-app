import { useEffect } from "react";
import { currentCity, setCurrentCity } from "../redux/citiesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
// navigations
import WelcomeStack from "./WelcomeStack";
import AppStack from "./AppStack";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser } from "../redux/authSlice";
import auth from "@react-native-firebase/auth";

const MainNavigation = () => {
  const dispatch = useAppDispatch();
  const _currentCity = useAppSelector(currentCity);

  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch(setUser(user));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const getSoredCity = async () => {
    const storedCity = await AsyncStorage.getItem("@city");
    if (storedCity !== null) {
      dispatch(setCurrentCity(storedCity));
    }
  };

  useEffect(() => {
    getSoredCity();
  }, [_currentCity]);

  return _currentCity ? <AppStack /> : <WelcomeStack />;
};

export default MainNavigation;
