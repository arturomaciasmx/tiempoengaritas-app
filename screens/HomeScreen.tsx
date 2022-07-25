import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, } from "react-native";
import PortsList from "../components/PortsList";
import SelectCityButton from "../components/SelectCityButton";
// redux
import { currentCity } from "../src/redux/citiesSlice";
import { fetchPorts } from "../src/redux/portsSlice";
import { useAppDispatch, useAppSelector } from "../src/app/hooks";

const HomeScreen = ({ navigation }) => {

  const dispatch = useAppDispatch();
  const _currentCity = useAppSelector(currentCity);

  useEffect(() => {
    if (_currentCity) {
      dispatch(fetchPorts(_currentCity))
    }
  }, [_currentCity])

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
      {/* <Text>{loggedInUser.email} dasd</Text> */}
      <ScrollView>
        <PortsList />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default HomeScreen;
