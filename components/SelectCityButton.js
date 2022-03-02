import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useCity } from '../context/cityProvider';
import CitiesList from './CitiesList';


const SelectCityButton = () => {

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