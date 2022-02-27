import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import Header from '../components/Header'
import PortsList from '../components/PortsList';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({navigation}) => {
    
    const [data, setPortsList] = useState([]);
    const [city, setCity] = useState(null);

    useEffect(() => {
        getSoredCity()
        if (city != null) {
          getPorts()
        }
    }, [city])

    React.useLayoutEffect(() => {
      navigation.setOptions({
          headerRight: () => {
            if (city) {
              return <Text style={styles.currentCity}>{city.replace(/-/g, " ")}</Text>;
            }
          },
      })
    }, [navigation, city])
    

    const getSoredCity = async () => {
      try {
        const storedCity = await AsyncStorage.getItem("@city")
        if (storedCity !== null) {
          setCity(storedCity)
        }
      } catch (e) {
        // error reading value
        console.log(e);
      }
    }

    const getPorts = () => {
        return fetch('https://tiempoengaritas.herokuapp.com/api/' + city)
        .then((response) => response.json())
        .then((json) => {
            setPortsList(json)
        })
        .catch((error) => {
            console.error(error)
        })
    }
    if (city != null) {
      return (
        <View style={styles.container}>
          {/* <Header currentCity={city} setCity={setCity} navigation={navigation}/> */}
          <ScrollView>
              <PortsList ports={data}/>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <Text>Loading...</Text>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  currentCity: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 20,
    fontWeight: "bold",
    color: "#006bf7",
    textTransform: "capitalize",
  },
});

export default HomeScreen