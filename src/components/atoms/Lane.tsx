import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppStackProps } from "../../navigation/AppStack";
import { LaneProps } from "../../app/types";

const Images = {
  peatonal: require("../../../assets/peatonal.png"),
  vehicular: require("../../../assets/vehicular.png"),
};

const Lane: React.FC<LaneProps> = (props) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackProps>>();
  let image = Images.vehicular;

  if (props.lane.status == "N/A") return null;

  props.lane.type == "vehicular" ? (image = Images.vehicular) : (image = Images.peatonal);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("GaritasStackNavigator", {
          screen: "Port",
          params: {
            port: {
              number: props.port.number,
              name: props.port.name,
              crossing_name: props.port.crossing_name,
              status: props.port.status,
            },
            lane: {
              status: props.lane.status,
              lanes_open: props.lane.lanes_open,
              delay_minutes: props.lane.delay_minutes,
              type: props.lane.type,
              is_readylane: props.lane.is_readylane,
              image: image,
            },
          },
        });
      }}
    >
      <View style={styles.lane}>
        <View style={styles.lane_type}>
          <Image style={styles.image} source={image} />
          <Text>{props.lane.is_readylane ? "Ready Lane" : "Standard"}</Text>
        </View>
        <Text>{props.lane.delay_minutes}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lane: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  lane_type: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 40,
    marginRight: 10,
  },
});
export default Lane;
