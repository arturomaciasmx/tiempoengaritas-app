import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  // Button,
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
    return fetch("http://137.184.228.33/api/" + city)
      .then((response) => response.json())
      .then((json) => {
        setPortsList(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (city == null) return <Text>Loading...</Text>;

  // const deleteCity = async () => {
  //   try {
  //     await AsyncStorage.removeItem("@city");
  //     console.log('Data removed')
  //   }
  //   catch(exception) {
  //       console.log(exception)
  //   }
  // }

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
