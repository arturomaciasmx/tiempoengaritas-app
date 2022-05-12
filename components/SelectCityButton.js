import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Overlay } from "@rneui/themed";
import { useCity } from '../context/cityProvider';
import CitiesList from './CitiesList';


const SelectCityButton = ({cities}) => {

  const [visible, setVisible] = useState(false);
  const { city } = useCity();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => toggleOverlay()}>
        <Text style={styles.currentCity}>{city.replace(/-/g, " ")}</Text>
      </TouchableOpacity>
      <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay()}>
        <CitiesList
          toggleOverlay={toggleOverlay}
          cities = {cities}
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