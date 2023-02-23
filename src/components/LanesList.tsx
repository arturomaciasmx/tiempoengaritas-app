import React from "react";
import { View, Text } from "react-native";
import Lane from "./atoms/Lane";
import { Port } from "../app/types";

const delayTime = (lane) => {
  let delay = lane.delay_minutes;

  if (lane.status == "Lanes Closed") delay = "Cerrado";

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

const LanesList: React.FC<Port> = ({ port }) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ fontSize: 25, marginBottom: 10 }}>{port.crossing_name}</Text>

      {/* Pedestrian standard lanes */}
      <Lane
        port={{
          number: port.number,
          name: port.name,
          crossing_name: port.crossing_name,
          status: port.status,
        }}
        lane={{
          status: port.pedestrian_lanes.standard_lanes.status,
          lanes_open: port.pedestrian_lanes.standard_lanes.lanes_open,
          delay_minutes: delayTime(port.pedestrian_lanes.standard_lanes),
          type: "peatonal",
          is_readylane: false,
        }}
      />

      {/* Pedestrian radylane lanes */}
      <Lane
        port={{
          number: port.number,
          name: port.name,
          crossing_name: port.crossing_name,
          status: port.status,
        }}
        lane={{
          status: port.pedestrian_lanes.ready_lanes.status,
          lanes_open: port.pedestrian_lanes.ready_lanes.lanes_open,
          delay_minutes: delayTime(port.pedestrian_lanes.ready_lanes),
          type: "peatonal",
          is_readylane: true,
        }}
      />

      {/* Vehicle standard lanes */}
      <Lane
        port={{
          number: port.number,
          name: port.name,
          crossing_name: port.crossing_name,
          status: port.status,
        }}
        lane={{
          status: port.vehicle_lanes.standard_lanes.status,
          lanes_open: port.vehicle_lanes.standard_lanes.lanes_open,
          delay_minutes: delayTime(port.vehicle_lanes.standard_lanes),
          type: "vehicular",
          is_readylane: false,
        }}
      />

      {/* Vehicle readylane lanes */}
      <Lane
        port={{
          number: port.number,
          name: port.name,
          crossing_name: port.crossing_name,
          status: port.status,
        }}
        lane={{
          status: port.vehicle_lanes.ready_lanes.status,
          lanes_open: port.vehicle_lanes.ready_lanes.lanes_open,
          delay_minutes: delayTime(port.vehicle_lanes.ready_lanes),
          type: "vehicular",
          is_readylane: true,
        }}
      />
    </View>
  );
};

export default LanesList;
