import React, { useState, useEffect } from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCity } from '../context/cityProvider';

const CitiesList = ({toggleOverlay}) => {
  const [cities, setCities] = useState([]);
  const {setCity} = useCity()


  const getCities = () => {
    return fetch("https://tiempoengaritas.herokuapp.com/api/cities")
      .then((response) => response.json())
      .then((json) => {
        setCities(json);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  _storeCity = async (city) => {
    try {
      await AsyncStorage.setItem("@city", city);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  useEffect(() => {
    getCities();
  }, []);

  const Ciudad = (props) => {
    return props.city.ciudades.map((ciudad, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          _storeCity(ciudad.slug);
          if (setCity) {
            if (toggleOverlay) toggleOverlay();
            setCity(ciudad.slug);
          }
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 15, color: "#505050" }}>
          {ciudad.name}
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
      <ScrollView>
        {cities.map((city, index) => (
          <View key={index}>
            <Text
              style={{ fontSize: 23, fontWeight: "bold", marginBottom: 15 }}
            >
              {city.estado}
            </Text>
            <Ciudad city={city} />
          </View>
        ))}
      </ScrollView>
  )

}

export default CitiesList
