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

const HomeScreen = ({ navigation }) => {
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
            />
          );
        }
      },
    });
  }, [navigation, city]);

  const getPorts = () => {
    return fetch("https://tiempoengaritas.herokuapp.com/api/" + city)
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
