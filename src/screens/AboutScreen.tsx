import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

const AboutScreen = ({ navigation }) => {
  const version = Constants.manifest.version;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tiempo en Garitas</Text>
      <Text style={styles.info}>
        Los tiempos mostrados en la aplicación son obtenidos del sitio oficial de CBP, los
        tiempos son aproximados y no somos responsables de actualizar la información.
      </Text>
      <Text style={styles.version}>Version {version}</Text>
      <Text style={styles.version}>Desarrollado por Arma23</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 20,
  },
  info: {
    textAlign: "center",
    marginBottom: 50,
  },
  version: {
    fontSize: 12,
    textAlign: "center",
  },
});
export default AboutScreen;
