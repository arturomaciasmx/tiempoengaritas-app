import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import PortsList from "../components/PortsList";
import SelectCityButton from "../components/atoms/SelectCityButton";
// redux
import { currentCity } from "../redux/citiesSlice";
import { fetchPorts } from "../redux/portsSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
// navigation
// import { DrawerNavigationProp } from "@react-navigation/drawer";
// import { DefaultDrawerProps } from "../navigation/DefaultDrawer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GaritasStackProps } from "../app/types";

// export type HomeScreenNavigationProp = DrawerNavigationProp<
//   DefaultDrawerProps,
//   "GaritasStack"
// >;

type Props = NativeStackScreenProps<GaritasStackProps, "Home">;

const HomeScreen = ({ route, navigation }: Props) => {
  const dispatch = useAppDispatch();
  const _currentCity: string = useAppSelector(currentCity);

  useEffect(() => {
    if (_currentCity) {
      dispatch(fetchPorts(_currentCity));
    }
  }, [_currentCity]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (_currentCity) {
          return <SelectCityButton />;
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
    paddingHorizontal: 15,
  },
});

export default HomeScreen;
