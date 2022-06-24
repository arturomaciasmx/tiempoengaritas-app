import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  ScrollView,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import PortsList from "../components/PortsList";
import SelectCityButton from "../components/SelectCityButton";
import { currentCity } from "../src/redux/citiesSlice";

const HomeScreen = ({ navigation, cities }) => {
  const _currentCity = useSelector(currentCity);
  const [portsList, setPortsList] = useState([]);
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (_currentCity) {
          return (
            <SelectCityButton
              navigation={navigation}
            />
          );
        }
      },
    });
  }, [navigation, _currentCity]);

  const getPorts = () => {
    return fetch("http://137.184.228.33:7000/api/" + city)
      .then((response) => response.json())
      .then((json) => {
        setPortsList(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* <PortsList ports={portsList} /> */}
      </ScrollView>
      <Button title="Delete City" onPress={() => deleteCity()}>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
