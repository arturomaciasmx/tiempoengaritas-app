import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { currentCity } from "../../src/redux/citiesSlice";
import { HomeScreenNavigationProp } from "../../screens/HomeScreen";


const SelectCityButton: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const _currentCity = useSelector(currentCity);

  const selectCity = () => {
    navigation.navigate("Cities");
  };

  return (
    <TouchableOpacity onPress={() => selectCity()}>
      <Text style={styles.currentCity}>{_currentCity.replace(/-/g, " ")}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  currentCity: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 20,
    fontWeight: "bold",
    color: "#006bf7",
    textTransform: "capitalize",
    marginRight: 10,
  },
});

export default SelectCityButton;
