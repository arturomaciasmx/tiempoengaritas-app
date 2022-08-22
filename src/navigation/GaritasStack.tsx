import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PortScreen from "../screens/PortScreen";

export type GaritasStackProps = {
  Home: undefined;
  Port: {
    port: {
      number: string;
      name: string;
      crossing_name: string;
      status: string;
    };
    lane: {
      status: string;
      lanes_open: string;
      delay_minutes: string;
      type: string;
      is_readylane: boolean;
      image: any | undefined;
    };
  };
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
