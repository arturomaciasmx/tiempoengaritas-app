import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { cities, fetchCities } from "../redux/citiesSlice";
import { setCurrentCity } from "../redux/citiesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CitiesScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCities());
  }, []);

  const _cities = useAppSelector(cities);
  return (
    <View style={styles.container}>
      <ScrollView>
        {_cities.map((element, index) => (
          <View key={index}>
            <Text style={styles.state}>{element.estado}</Text>
            <Cities element={element} navigation={navigation} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const Cities = ({ element, navigation }) => {
  const dispatch = useAppDispatch();

  async function selectCity(city) {
    try {
      await AsyncStorage.setItem("@city", city.slug);
      dispatch(setCurrentCity(city.slug));
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  }

  return element.ciudades.map((city, index) => (
    <TouchableOpacity key={index} onPress={() => selectCity(city)}>
      <Text style={styles.city}>{city.name}</Text>
    </TouchableOpacity>
  ));
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: "white",
    paddingBottom: 50,
  },
  state: {
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: "#006bf7",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 20,
    borderRadius: 10,
  },
  city: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default CitiesScreen;
