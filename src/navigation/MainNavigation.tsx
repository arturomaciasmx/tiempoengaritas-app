import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentCity, setCurrentCity } from "../redux/citiesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
// navigations
import WelcomeStack from "./WelcomeStack";
import AppStack from "./AppStack";

const MainNavigation = () => {
  const _currentCity = useSelector(currentCity);
  const dispatch = useDispatch();

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
