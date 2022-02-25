import React, {useState, useEffect} from "react";
import { View, Text, Button } from "react-native"
import CitiesList from "../components/CitiesList"

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <CitiesList />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

export default WelcomeScreen