import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Overlay } from "@rneui/themed";
import CitiesList from './CitiesList';
import { useSelector } from 'react-redux';
import { currentCity } from '../src/redux/citiesSlice';


const SelectCityButton = ({cities}) => {
  const _currentCity = useSelector(currentCity);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log(_currentCity);
  }, [_currentCity])

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => toggleOverlay()}>
        <Text style={styles.currentCity}>{_currentCity.replace(/-/g, " ")}</Text>
      </TouchableOpacity>
      <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay()}>
        <CitiesList
          toggleOverlay={toggleOverlay}
        />
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  currentCity: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 20,
    fontWeight: "bold",
    color: "#006bf7",
    textTransform: "capitalize",
  },
});

export default SelectCityButton