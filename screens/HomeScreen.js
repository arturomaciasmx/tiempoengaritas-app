import React, {useEffect, useState} from 'react'
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, FlatList, ScrollView, Button } from 'react-native'
import Header from '../components/Header'
import PortsList from '../components/PortsList';

const HomeScreen = () => {
    
    const [data, setData] = useState([]);
    const [city, setCity] = useState('tijuana');
    
    useEffect(() => {
        console.log(city);
        getPorts()
    }, [city])

      
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

    return(
        <SafeAreaView style={styles.container}>
            <Header curretCity={city} setCity={setCity}/>
            
            <Button 
                onPress={() => setCity('tecate') }
                title='Update'
            />
            
            <PortsList ports={data}/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        marginHorizontal: 20,
    },
})

export default HomeScreen