import React, {useState, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, Text} from 'react-native'

const CitiesList = ({setCity, toggleOverlay}) => {

  const [cities, setCities] = useState([])

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

  useEffect(() => {
    getCities()
  }, [])

  const Ciudad = (props) => {
    return  props.city.ciudades.map((ciudad, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => {
                  console.log(ciudad);
                  setCity(ciudad.toLowerCase())
                  toggleOverlay()
                }}>
                <Text style={{ fontSize: 18, marginBottom: 15, color: '#f7f7f7' }}>{ciudad}</Text>
              </TouchableOpacity>
            ))
  }

  return (
    <View style={{ height: 600, width: 300, padding: 15 }}>
      <ScrollView>
        {
          cities.map((city, index) => (
            <View key={index}>
              <Text style={{ fontSize: 23, fontWeight: 'bold', marginBottom: 15 }}>{city.estado}</Text>
              <Ciudad city={city}/>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
};

export default CitiesList;
