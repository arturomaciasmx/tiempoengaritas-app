import React from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { ports } from "../redux/portsSlice";
import LanesList from "./LanesList";

const PortsList: React.FC = () => {
  const _ports = useSelector(ports);
  return (
    <ScrollView>
      {_ports.map((port, index) => (
        <View key={index}>
          <LanesList port={port} />
        </View>
      ))}
    </ScrollView>
  );
};

export default PortsList;
