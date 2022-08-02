import 'expo-dev-client';
import React from "react";
import "react-native-gesture-handler";
// redux
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
// navigator
import { NavigationContainer } from "@react-navigation/native";
import MainNavigation from './navigation/MainNavigation';

const App: React.FC = () => {
  return(
    <Provider store={store}>
      <NavigationContainer>
          <MainNavigation />
      </NavigationContainer>
    </Provider>
  )
}

export default App;
