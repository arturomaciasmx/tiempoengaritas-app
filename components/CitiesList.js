import React from 'react'
import { View, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native'
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
    <View style={{ height: Dimensions.get("screen").height - 120, alignItems: 'center' }}>
      <ScrollView
        style={{ width: Dimensions.get("screen").width - 90, padding: 10, borderRadius: 20 }}
      >
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
    </View>
  );

}

export default CitiesList
