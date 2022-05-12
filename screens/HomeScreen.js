import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  ScrollView,
  View,
} from "react-native";

import PortsList from "../components/PortsList";
import SelectCityButton from "../components/SelectCityButton";
import { useCity } from "../context/cityProvider";

const HomeScreen = ({ navigation, cities }) => {

  const [portsList, setPortsList] = useState([]);

  const {city} = useCity();

  useEffect(() => {
    if (city != null) getPorts();
  }, [city]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (city) {
          return (
            <SelectCityButton
              navigation={navigation}
              cities={cities}
            />
          );
        }
      },
    });
  }, [navigation, city]);

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

  if (city == null) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <PortsList ports={portsList} />
      </ScrollView>
      {/* <Button title="Delete City" onPress={() => deleteCity()}>
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
