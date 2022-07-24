import { createDrawerNavigator } from "@react-navigation/drawer";
// screens
import HomeScreen from "../screens/HomeScreen";
import CitiesScreen from "../screens/CitiesScreen";
import AboutScreen from "../screens/AboutScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Drawer = createDrawerNavigator();

const DefaultDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{title: "Tiempo en Garitas"}}/>
      <Drawer.Screen name="Cities" component={CitiesScreen} options={{title: "Seleccionar ciudad"}}/>
      <Drawer.Screen name="About" component={AboutScreen} options={{title: "Acerca de"}}/>
      <Drawer.Screen name="Login" component={LoginScreen} options={{title: "Login", headerShown: false}}/>
      <Drawer.Screen name="Register" component={RegisterScreen} options={{title: "Registrate", headerShown: false}}/>
    </Drawer.Navigator>
  )
}

export default DefaultDrawer