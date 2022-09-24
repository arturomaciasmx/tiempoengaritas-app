import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { currentCity, setCurrentCity } from "../redux/citiesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
// navigations
import WelcomeStack from "./WelcomeStack";
import AppStack from "./AppStack";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser, user } from "../redux/authSlice";
import auth from "@react-native-firebase/auth";

const MainNavigation = () => {
  const dispatch = useAppDispatch();
  // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  const logged_user = useAppSelector(user);
  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch(setUser(user));
    // if (initializing) setInitializing(false);
    if (logged_user) console.log(logged_user["email"]);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const _currentCity = useAppSelector(currentCity);
  // const dispatch = useDispatch();

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
