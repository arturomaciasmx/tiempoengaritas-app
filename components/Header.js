import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Overlay } from 'react-native-elements';
import CitiesList from './CitiesList';

const Header = ({setCity, curretCity}) => {

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <View>
            <View style={styles.header}>
                <Icon
                    name='menu' />
                <TouchableOpacity onPress={toggleOverlay}>
                    <Text style={styles.city}>{curretCity}</Text>
                </TouchableOpacity>
            </View>
            
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <CitiesList setCity={setCity} toggleOverlay={toggleOverlay}/>
            </Overlay>
        </View>
        
    )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  city: {
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 20,
    fontWeight: "bold",
    color: "#006bf7",
    textTransform: "capitalize",
  },
});

export default Header