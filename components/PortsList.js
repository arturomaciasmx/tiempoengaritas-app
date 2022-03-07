import React from "react";
import { ScrollView, View } from "react-native";
import LanesList from "./LanesList";

const PortsList = ({ ports }) => {
  return (
    <ScrollView style={{ padding: 10 }}>
      {ports.map((port, index) => (
        <View key={index}>

          <LanesList port={port} />

        </View>
      ))}
    </ScrollView>
  );
};

export default PortsList;
