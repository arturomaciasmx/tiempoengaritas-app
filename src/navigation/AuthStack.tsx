import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackProps } from "../app/types";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack = createNativeStackNavigator<AuthStackProps>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="SignUp"
        component={RegisterScreen}
        options={{ headerShadowVisible: false, title: "" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
