import React from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { ports } from "../src/redux/portsSlice";
import LanesList from "./LanesList";

const PortsList = () => {
  const _ports = useSelector(ports);
  return (
    <ScrollView style={{ padding: 10 }}>
      {_ports.map((port, index) => (
        <View key={index}>

          <LanesList port={port} />

        </View>
      ))}
    </ScrollView>
  );
};

export default PortsList;
