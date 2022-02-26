import React, {useState, useEffect} from "react";
import { Text, StyleSheet, StatusBar } from "react-native";
import CitiesList from "../components/CitiesList"
import { SafeAreaProvider } from "react-native-safe-area-context";
const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={{ fontSize:25, paddingLeft: 10, marginTop: 10}}>Selecciona Tu Ciudad</Text>
      <CitiesList navigation={ navigation }/>
    </SafeAreaProvider>
  );
};

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingBottom: StatusBar.currentHeight + 10,
  },
});