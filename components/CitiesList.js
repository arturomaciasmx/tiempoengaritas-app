import React, { useState, useEffect } from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCity } from '../context/cityProvider';

const CitiesList = ({toggleOverlay, cities}) => {

  const _storeCity = async (city) => {
    try {
      await AsyncStorage.setItem("@city", city);
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  const Ciudad = (props) => {
    
    const {setCity} = useCity(); 
    
    return props.city.ciudades.map((ciudad, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
            _storeCity(ciudad.slug);
            if (toggleOverlay) toggleOverlay();
            setCity(ciudad.slug);
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
