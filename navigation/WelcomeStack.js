import CitiesScreen from "../screens/CitiesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {  
  return (
      <Stack.Navigator>
        <Stack.Screen name="Selecciona Tu Ciudad" component={CitiesScreen} />
      </Stack.Navigator>    
    )
}

export default WelcomeStack