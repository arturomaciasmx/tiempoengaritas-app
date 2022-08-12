import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants"

const AboutScreen = ({navigation}) => {
  const version = Constants.manifest.version
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Tiempo en Garitas</Text>
      <Text style={styles.info}>Los tiempos mostrados son obtenidos directamente del sitio oficial de CBP, Por lo cual son tiempos aproximados y no somos responsables de actualizar la informacion.</Text>
      <Text style={styles.version}>Version {version}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 50
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
    textAlign: "center"
  }
})
export default AboutScreen