import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DefaultDrawer, { DefaultDrawerProps } from "./DefaultDrawer";
import GaritasStack, { GaritasStackProps } from "./GaritasStack";

export type AppStackProps = {
  DefaultDrawerNavigator: NavigatorScreenParams<DefaultDrawerProps>;
  GaritasStackNavigator: NavigatorScreenParams<GaritasStackProps>;
};

const Stack = createNativeStackNavigator<AppStackProps>();
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DefaultDrawerNavigator" component={DefaultDrawer} />
      <Stack.Screen name="GaritasStackNavigator" component={GaritasStack} />
    </Stack.Navigator>
  );
};

export default AppStack;
