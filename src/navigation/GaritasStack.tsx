import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import PortScreen from "../screens/PortScreen";
import PostScreen from "../screens/PostScreen";
import CommentScreen from "../screens/CommentScreen";
import CommentsListScreen from "../screens/CommentsListScreen";
import { GaritasStackProps } from "../app/types";

const Stack = createNativeStackNavigator<GaritasStackProps>();

const GaritasStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Port"
        component={PortScreen}
        options={{ headerShadowVisible: false }}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{ headerShadowVisible: false, title: "Crear publicación" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal", headerShadowVisible: false }}>
        <Stack.Screen name="Comment" component={CommentScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal", headerShadowVisible: false }}>
        <Stack.Screen name="CommentsList" component={CommentsListScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default GaritasStack;
