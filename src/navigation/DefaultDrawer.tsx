import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerNavigationProp,
} from "@react-navigation/drawer";

// screens
import HomeScreen from "../screens/HomeScreen";
import CitiesScreen from "../screens/CitiesScreen";
import AboutScreen from "../screens/AboutScreen";

import { Image, StyleSheet, Text, View } from "react-native";

import logo from "../assets/logo_tiempo_en_garitas.png";
import AuthStack, { AuthStackProps } from "./AuthStack";

export type RootDrawerParamList = {
  Home: undefined;
  Cities: undefined;
  About: undefined;
  AuthStackScreen: AuthStackProps;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DefaultDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveBackgroundColor: "#006bf7",
        drawerActiveTintColor: "#ffffff",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ drawerLabel: "Inicio" }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Cities"
        component={CitiesScreen}
        options={{ drawerLabel: "Seleccionar Ciudad" }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{ drawerLabel: "Acerca de" }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="AuthStackScreen"
        component={AuthStack}
        options={{
          headerShown: false,
          swipeEnabled: false,
          drawerItemStyle: {
            display: "none",
          },
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

type CustomDrawerProps = DrawerContentComponentProps;

const CustomDrawer = (props: CustomDrawerProps) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label={"Inicia Sesion"}
        onPress={() => {
          props.navigation.navigate("AuthStackScreen");
        }}
      />
    </View>
  );
};

export default DefaultDrawer;
