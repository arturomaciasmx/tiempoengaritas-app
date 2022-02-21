import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';


const Images = {
    peatonal: require('../assets/peatonal.png'),
    vehicular: require('../assets/vehicular.png')
}


const PortsList = ({ports}) => {
    
    const Lanes = (props) => {

        if (props.status == 'N/A') return null
        
        
        let image = Images.peatonal

        if (props.type == 'vehicular') {
            image = Images.vehicular
        }

        return <View style={styles.lane}>
                    <Image 
                        style={{ width: 50, height: 40 }}
                        source={ image }/>
                    <Text>{props.name}</Text>
                    <Text>{props.delay}</Text>
                </View>
    }

    function delayTime(lanes) {
        let delay = lanes.delay_minutes

        if (lanes.status == 'Lanes Closed') {
            delay = 'Cerrado'
            return delay
        }

        if (Number.isInteger(parseInt(delay))) {
            delay = delay

            if (delay >= 60) {
                let h = Math.floor(delay / 60)
                let min = delay % 60

                if (min == 0 ) min = '00'

                delay = h + ':' + min + ' Hrs'
                
                return delay
            }

            return delay + ' Min'
        }

        return delay
    }  

    return (
            <ScrollView style={{ marginBottom: 50 }}>
                {ports.map((port, index) => (
                    <View key={index}>
                        <Text style={{ fontSize: 20 }}>{port.name}</Text>

                        {/* Pedestrian standard lanes */}
                        <Lanes 
                            status={port.pedestrian_lanes.standard_lanes.status}
                            name={'Pedestrian ' + port.crossing_name} 
                            delay={delayTime(port.pedestrian_lanes.standard_lanes)}
                            type='peatonal' />


                        {/* Pedestrian radylane lanes */}
                        <Lanes 
                            status={port.pedestrian_lanes.ready_lanes.status}
                            name={'Pedestrian - RD ' + port.crossing_name} 
                            delay={delayTime(port.pedestrian_lanes.ready_lanes)}
                            type='peatonal' />


                        {/* Vehicle standard lanes */}
                        <Lanes 
                            status={port.vehicle_lanes.standard_lanes.status}
                            name={'Vehicle ' + port.crossing_name} 
                            delay={delayTime(port.vehicle_lanes.standard_lanes)}
                            type='vehicular' />

                        
                        {/* Vehicle readylane lanes */}
                        <Lanes 
                            status={port.vehicle_lanes.ready_lanes.status}
                            name={'Vehicle - RD ' + port.crossing_name} 
                            delay={delayTime(port.vehicle_lanes.ready_lanes)}
                            type='vehicular' />

                    </View>
                ))}
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    lane: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
            }
})

export default PortsList