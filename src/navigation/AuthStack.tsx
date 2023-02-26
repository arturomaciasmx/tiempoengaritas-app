import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackProps } from "../app/types";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack = createNativeStackNavigator<AuthStackProps>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShadowVisible: false, title: "" }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
