import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";

// screens
import HomeScreen from "../screens/HomeScreen";
import CitiesScreen from "../screens/CitiesScreen";
import AboutScreen from "../screens/AboutScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import { Image, StyleSheet, Text, View } from "react-native";

import logo from "../assets/logo_tiempo_en_garitas.png";

export type RootDrawerParamList = {
  Home;
  Cities;
  About;
  Register;
  Login;
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DefaultDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawer {...props}/>}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{title: "Tiempo en Garitas"}}/>
      <Drawer.Screen name="Cities" component={CitiesScreen} options={{title: "Seleccionar ciudad"}}/>
      <Drawer.Screen name="About" component={AboutScreen} options={{title: "Acerca de"}}/>
      <Drawer.Screen name="Register" component={RegisterScreen} options={{title: "Registrate", headerShown: false}}/>
      <Drawer.Screen name="Login" component={LoginScreen} options={{title: "Login", headerShown: false}}/>
    </Drawer.Navigator>
  )
}

const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: "red", flex: 1}}>
      <View style={{flex: 1, justifyContent: "space-between", backgroundColor: "white"}}>
        <View style={styles.header}>
          <Image style={styles.headerLogo} source={logo} resizeMode={"center"}/>
          <Text style={styles.headerText}>Tijuana</Text>
        </View>
        <DrawerItem label="Ciudad" onPress={() => props.navigation.navigate("Cities")}/>
        <DrawerItem label="Login" onPress={() => props.navigation.navigate("Login")}/>
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 40,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    flex: 1
  },
  headerLogo: {
    width: 200,
    height: 50
  },
  headerText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold"
  }
})

export default DefaultDrawer