import CitiesScreen from "../screens/CitiesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

type WelcomeStackParamList = {
  SelectCity: undefined;
}

const Stack = createNativeStackNavigator<WelcomeStackParamList>();

const WelcomeStack = () => {  
  return (
      <Stack.Navigator>
        <Stack.Screen name="SelectCity" component={CitiesScreen} options={{title: "Seleccion tu ciudad"}}/>
      </Stack.Navigator>    
    )
}

export default WelcomeStack