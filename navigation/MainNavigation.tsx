import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentCity, setCurrentCity } from "../src/redux/citiesSlice";
import { user, setUser } from "../src/redux/authSlice";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// navigations
import DefaultDrawer from "./DefaultDrawer";
import WelcomeStack from "./WelcomeStack";


const MainNavigation = () => {
  const loggedInUser = useSelector(user)
  const _currentCity = useSelector(currentCity);
  const dispatch = useDispatch();

  const getSoredCity = async () => {
    const storedCity = await AsyncStorage.getItem("@city");
    if (storedCity !== null) {
      dispatch(setCurrentCity(storedCity));
    }
  }; 
  
  function onAuthStateChanged(user) {
    // console.log(user.toJSON());
    // dispatch(setUser(user.toJSON()));
  }

  useEffect(() => {
    getSoredCity();
  }, [_currentCity]);
  
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  return  _currentCity ? <DefaultDrawer /> : <WelcomeStack />;
}   

export default MainNavigation