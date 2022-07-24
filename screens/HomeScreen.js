import React, { useEffect } from "react";
import { StyleSheet, ScrollView, View, } from "react-native";
import PortsList from "../components/PortsList";
import SelectCityButton from "../components/SelectCityButton";
// redux
import { useDispatch, useSelector } from "react-redux";
import { currentCity } from "../src/redux/citiesSlice";
import { fetchPorts } from "../src/redux/portsSlice";
// analytics
import analytics from "@react-native-firebase/analytics";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const _currentCity = useSelector(currentCity);

  async function analyticsEvent() {
    await analytics().logEvent('basket', {
      id: 3745092,
      item: 'mens grey t-shirt',
      description: ['round neck', 'long sleeved'],
      size: 'L',
    })
  }

  useEffect(() => {
    if (_currentCity) {
      dispatch(fetchPorts(_currentCity))
    }
    analyticsEvent();
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
