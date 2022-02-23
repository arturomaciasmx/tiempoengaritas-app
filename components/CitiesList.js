import React, {useState, useEffect} from 'react';
import { View, ScrollView, TouchableOpacity, Text} from 'react-native'

const CitiesList = ({setCity, toggleOverlay}) => {

  // const [cities, setCities] = useState([])

  // const getCities = () => {
  //   return fetch("https://tiempoengaritas.herokuapp.com/api/cities")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setCities(json);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // useEffect(() => {
  //   getCities()
  //   console.log(cities);
  // }, [])

  const cities = [{
    "estado": "Baja California",
    "ciudades": ["Tijuana", "Tecate", "Mexicali"]
  }]

  const Ciudad = (props) => {
    return  props.city.ciudades.map((ciudad, index) => (
              <Text>{ciudad}</Text>
            ))
  }

  return (
    <View style={{ height: 400, width: 300 }}>
      <ScrollView>
        {
          cities.map((city, index) => (
            <View>
            <Text>{city.estado}</Text>
             <Ciudad city={city}/>
            </View>
          ))
        }
      </ScrollView>
    </View>
  );
};

export default CitiesList;
