import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, } from "react-native";
import PortsList from "../components/PortsList";
import SelectCityButton from "../components/atoms/SelectCityButton";
// redux
import { currentCity } from "../src/redux/citiesSlice";
import { fetchPorts } from "../src/redux/portsSlice";
import { useAppDispatch, useAppSelector } from "../src/app/hooks";
// navigation
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../navigation/DefaultDrawer";
import { useNavigation } from "@react-navigation/native";

export type HomeScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, "Home">

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>()
  const dispatch = useAppDispatch();
  const _currentCity: string = useAppSelector(currentCity);

  useEffect(() => {
    if (_currentCity) {
      dispatch(fetchPorts(_currentCity))
    }
  }, [_currentCity])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (_currentCity) {
          return (<SelectCityButton />);
        }
      },
    });
  }, [navigation, _currentCity]);

  return (
    <View style={styles.container}>
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
