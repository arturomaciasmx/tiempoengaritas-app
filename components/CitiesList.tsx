import React, {useEffect} from 'react'
import { View, ScrollView, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { cities, fetchCities, setCurrentCity } from '../src/redux/citiesSlice'
import { useAppDispatch, useAppSelector } from '../src/app/hooks'

const CitiesList = ({toggleOverlay}) => {
  const dispatch = useAppDispatch();
  const _cities = useAppSelector(cities)

  useEffect(() => {
    dispatch(fetchCities())
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.list}>
        {_cities.map((city, index) => (
          <View key={index}>
            <Text style={styles.state}>
              {city.estado}
            </Text>
            <City city={city} toggleOverlay={toggleOverlay}/>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const City = (props) => {    
  const dispatch = useAppDispatch();
  const _storeCity = async (city) => {
    try {
      await AsyncStorage.setItem("@city", city);
      dispatch(setCurrentCity(city));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  return props.city.ciudades.map((ciudad, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
          _storeCity(ciudad.slug);
          if (props.toggleOverlay) props.toggleOverlay();
      }}
    >
      <Text style={{ fontSize: 18, marginBottom: 15, color: "#505050" }}>
        {ciudad.name}
      </Text>
    </TouchableOpacity>
  ));
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height - 120, 
    alignItems: 'center'
  },
  list: { 
    width: Dimensions.get("screen").width - 90, 
    padding: 10, 
    borderRadius: 20 
  },
  state: { 
    fontSize: 23, 
    fontWeight: "bold", 
    marginBottom: 15 
  }
})

export default CitiesList
