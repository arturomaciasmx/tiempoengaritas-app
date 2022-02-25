import React, {useEffect, useState} from 'react'
import { Platform, StatusBar, StyleSheet, Button, ScrollView } from 'react-native'
import Header from '../components/Header'
import PortsList from '../components/PortsList';
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({navigation}) => {
    
    const [data, setData] = useState([]);
    const [city, setCity] = useState('tijuana');
    
    useEffect(() => {
        getCity()
        getPorts()
    }, [city])

    const getCity = async () => {
      try {
        const value = await AsyncStorage.getItem("@city")
        if (value !== null) {
          // value previously stored
          setCity(value)
        }
      } catch (e) {
        // error reading value
        console.log(e);
      }
    };

    const getPorts = () => {
        return fetch('https://tiempoengaritas.herokuapp.com/api/' + city)
        .then((response) => response.json())
        .then((json) => {
            setData(json)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    return (
      <ScrollView style={styles.container}>
        <Header curretCity={city} setCity={setCity} />

        <Button
          title="Go to Welcome"
          onPress={() => navigation.navigate({city})}
        />

        <PortsList ports={data} />
      </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        marginHorizontal: 20,
    },
})

export default HomeScreen