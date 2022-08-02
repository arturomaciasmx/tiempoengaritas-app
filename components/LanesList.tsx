import React, { View, Text } from "react-native";
import Lane from "./atoms/Lane";

interface Props {
  port: {
    number: string;
    name: string;
    crossing_name: string;
    status: string;
    vehicle_lanes: {
      standard_lanes: {
        status: string;
        lanes_open: string;
        delay_minutes: string;
      };
      ready_lanes: {
        status: string;
        lanes_open: string;
        delay_minutes: string;
      };
    };
    pedestrian_lanes: {
      standard_lanes: {
        status: string;
        lanes_open: string;
        delay_minutes: string;
      };
      ready_lanes: {
        status: string;
        lanes_open: string;
        delay_minutes: string;
      };
    };
  };
};

const delayTime = (lane) => {
  let delay = lane.delay_minutes;

  if (lane.status == "Lane Closed") delay = "Cerrado";

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
};

const LanesList = ({ port }: Props) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 25, marginBottom: 10 }}>{port.crossing_name}</Text>

      {/* Pedestrian standard lanes */}
      <Lane
        status={port.pedestrian_lanes.standard_lanes.status}
        name={"Peatonal"}
        delay={delayTime(port.pedestrian_lanes.standard_lanes)}
        type="peatonal"
      />

      {/* Pedestrian radylane lanes */}
      <Lane
        status={port.pedestrian_lanes.ready_lanes.status}
        name={"Peatonal - Ready Lane "}
        delay={delayTime(port.pedestrian_lanes.ready_lanes)}
        type="peatonal"
      />

      {/* Vehicle standard lanes */}
      <Lane
        status={port.vehicle_lanes.standard_lanes.status}
        name={"Vehicular"}
        delay={delayTime(port.vehicle_lanes.standard_lanes)}
        type="vehicular"
      />

      {/* Vehicle readylane lanes */}
      <Lane
        status={port.vehicle_lanes.ready_lanes.status}
        name={"Vehicular - Ready Lane"}
        delay={delayTime(port.vehicle_lanes.ready_lanes)}
        type="vehicular"
      />
    </View>
  );
};

export default LanesList;
