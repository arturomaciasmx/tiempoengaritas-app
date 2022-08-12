import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PortScreen from "../screens/PortScreen";

export type GaritasStackProps = {
  Home: undefined;
  Port: undefined;
};

const Stack = createNativeStackNavigator<GaritasStackProps>();

const GaritasStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Port" component={PortScreen} />
    </Stack.Navigator>
  );
};

export default GaritasStack;
