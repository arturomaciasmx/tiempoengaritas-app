import CitiesScreen from "../screens/CitiesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type WelcomeStackProps = {
  SelectCity: undefined;
};

const Stack = createNativeStackNavigator<WelcomeStackProps>();

const WelcomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SelectCity"
        component={CitiesScreen}
        options={{ title: "Seleccion tu ciudad" }}
      />
    </Stack.Navigator>
  );
};

export default WelcomeStack;
