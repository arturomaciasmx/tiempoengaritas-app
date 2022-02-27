import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import LanesList from "./LanesList";

const PortsList = ({ ports }) => {
  return (
    <ScrollView>
      {ports.map((port, index) => (
        <View key={index}>

          <LanesList port={port} />

        </View>
      ))}
    </ScrollView>
  );
};

export default PortsList;
