import React from "react";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import auth from "@react-native-firebase/auth";

// screens
import CitiesScreen from "../screens/CitiesScreen";
import AboutScreen from "../screens/AboutScreen";
import AuthStack from "./AuthStack";
import GaritasStack from "./GaritasStack";
import { DefaultDrawerProps } from "../app/types";
import { View } from "react-native";
import SelectCityButton from "../components/atoms/SelectCityButton";
import { useAppSelector } from "../app/hooks";
import { user } from "../redux/authSlice";

const Drawer = createDrawerNavigator<DefaultDrawerProps>();

const DefaultDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="GaritasStack"
      screenOptions={{
        drawerActiveBackgroundColor: "#006bf7",
        drawerActiveTintColor: "#ffffff",
        headerRight: () => <SelectCityButton />,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="GaritasStack"
        component={GaritasStack}
        options={{ drawerLabel: "Inicio", headerTitle: "Tiempo en Garitas" }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Cities"
        component={CitiesScreen}
        options={{ drawerLabel: "Seleccionar Ciudad", headerTitle: "Seleccionar Ciudad" }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{ drawerLabel: "Acerca de", headerTitle: "Acerca de" }}
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
  let authButton = "Inicia Sesion";
  const logged_user = useAppSelector(user);

  if (logged_user) authButton = logged_user["email"];
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {!logged_user ? (
        <DrawerItem
          label={authButton}
          onPress={() => {
            props.navigation.navigate("AuthStackScreen");
          }}
        />
      ) : null}

      {logged_user != null && (
        <DrawerItem
          label={"Logout"}
          onPress={() => {
            auth()
              .signOut()
              .then(() => console.log("User signed out!"));
          }}
        />
      )}
    </View>
  );
};

export default DefaultDrawer;
