import React, { useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import CitiesList from "../components/CitiesList";

const WelcomeScreen = ({ navigation, cities }) => {

  return (
    <ScrollView style={styles.container}>
      <CitiesList navigation={navigation} cities={cities} />
    </ScrollView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
