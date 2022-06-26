import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, Button, } from "react-native";
import PortsList from "../components/PortsList";
import SelectCityButton from "../components/SelectCityButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
// redux
import { useDispatch, useSelector } from "react-redux";
import { currentCity } from "../src/redux/citiesSlice";
import { fetchPorts } from "../src/redux/portsSlice";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const _currentCity = useSelector(currentCity);

  useEffect(() => {
    if (_currentCity) {
      dispatch(fetchPorts(_currentCity))
    }
  }, [_currentCity])

  async function deletCity() {
    try {
      await AsyncStorage.removeItem("@city");
      return true;
    }
    catch(exception) {
        return false;
    }
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (_currentCity) {
          return (<SelectCityButton navigation={navigation} />);
        }
      },
    });
  }, [navigation, _currentCity]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <PortsList />
      </ScrollView>
      <Button onPress={() => deletCity()} title={"Delete city"}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
