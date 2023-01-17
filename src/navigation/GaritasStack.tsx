import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PortScreen from "../screens/PortScreen";
import PostScreen from "../screens/PostScreen";
import CommentScreen from "../screens/CommentScreen";

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
  Post: {
    port: {
      crossing_name: string;
      number: string;
    };
    lane: {
      type: string;
      is_readylane: string;
    };
  };
  Comment: {
    user_name: string;
    post_id: string;
  };
};

const Stack = createNativeStackNavigator<GaritasStackProps>();

const GaritasStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Port" component={PortScreen} />
      <Stack.Screen name="Post" component={PostScreen} />
      <Stack.Group screenOptions={{ presentation: "modal", headerShadowVisible: false }}>
        <Stack.Screen name="Comment" component={CommentScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default GaritasStack;
