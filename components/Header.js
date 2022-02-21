import React, {useState} from 'react'
import { View, Text, StyleSheet, Button, TouchableOpacity, ScrollView } from 'react-native'
import { Icon, Overlay } from 'react-native-elements';

const Header = ({setCity, curretCity}) => {

    const CITIES = [
        {name: 'tijuana'},
        {name: 'tecate'},
    ]

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
                    <Text style={{ backgroundColor: '#f7f7f7', padding: 10, borderRadius: 20, fontWeight: 'bold', color: '#006bf7', textTransform: 'capitalize' }}>{curretCity}</Text>
                </TouchableOpacity>
            </View>
            
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <View style={{ height: 400, width: 300 }}>
                    <ScrollView>
                        {CITIES.map((city, index) => (
                            <TouchableOpacity
                                onPress={() => {
                                        setCity(city.name)
                                        toggleOverlay()
                                    }
                                }>
                                <Text 
                                    key={index}
                                    style={{ fontSize: 18, paddingVertical: 10, textTransform: 'capitalize' }}>{city.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </Overlay>
        </View>
        
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
})

export default Header