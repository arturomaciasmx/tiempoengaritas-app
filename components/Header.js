import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Icon } from 'react-native-elements';

const Header = () => {
    return (
        <View style={styles.header}>
            <Icon
                name='menu' />

            <Text style={{ backgroundColor: '#f7f7f7', padding: 10, borderRadius: 20, fontWeight: 'bold', color: '#006bf7' }}>Tijuana</Text>
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