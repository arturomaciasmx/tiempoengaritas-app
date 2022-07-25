import React, { View, Image, Text, StyleSheet } from "react-native";

const LanesList = ({ port }) => {
  
  const Images = {
    peatonal: require("../assets/peatonal.png"),
    vehicular: require("../assets/vehicular.png"),
  };

  const Lanes = (props) => {
    let image = Images.vehicular

    if (props.status == "N/A") return null;

    props.type == "vehicular"
      ? (image = Images.vehicular)
      : (image = Images.peatonal);

    return (
      <View style={styles.lane}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ width: 50, height: 40, marginRight: 10 }}
            source={image}
          />
          <Text>{props.name}</Text>
        </View>
        <Text>{props.delay}</Text>
      </View>
    );
  };

  const delayTime = (lanes) => {
    let delay = lanes.delay_minutes;

    if (lanes.status == "Lanes Closed") delay = "Cerrado";

    if (Number.isInteger(parseInt(delay))) {
      //if is delay is more than 60 min convert min to hours
      if (delay < 60) {
        delay = delay + " Min";
      } else {
        let h = Math.floor(delay / 60);
        let min: number | string = delay % 60;

        if (min == 0) min = "00";

        delay = h + ":" + min + " Hrs";
      }
    }

    return delay;
  }

  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 25, marginBottom: 10 }}>
        {port.crossing_name}
      </Text>

      {/* Pedestrian standard lanes */}
      <Lanes
        status={port.pedestrian_lanes.standard_lanes.status}
        name={"Peatonal"}
        delay={delayTime(port.pedestrian_lanes.standard_lanes)}
        type="peatonal"
      />

      {/* Pedestrian radylane lanes */}
      <Lanes
        status={port.pedestrian_lanes.ready_lanes.status}
        name={"Peatonal - Ready Lane "}
        delay={delayTime(port.pedestrian_lanes.ready_lanes)}
        type="peatonal"
      />

      {/* Vehicle standard lanes */}
      <Lanes
        status={port.vehicle_lanes.standard_lanes.status}
        name={"Vehicular"}
        delay={delayTime(port.vehicle_lanes.standard_lanes)}
        type="vehicular"
      />

      {/* Vehicle readylane lanes */}
      <Lanes
        status={port.vehicle_lanes.ready_lanes.status}
        name={"Vehicular - Ready Lane"}
        delay={delayTime(port.vehicle_lanes.ready_lanes)}
        type="vehicular"
      />
    </View>
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
});

export default LanesList;
