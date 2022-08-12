import { Image, StyleSheet, Text, View } from "react-native";

interface LaneProps {
  status: string;
  name: string;
  type: string;
  delay: string;
}

const Images = {
  peatonal: require("../../../assets/peatonal.png"),
  vehicular: require("../../../assets/vehicular.png"),
};

const Lane: React.FC<LaneProps> = (props) => {
  let image = Images.vehicular;

  if (props.status == "N/A") return null;

  props.type == "vehicular" ? (image = Images.vehicular) : (image = Images.peatonal);

  return (
    <View style={styles.lane}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image style={{ width: 50, height: 40, marginRight: 10 }} source={image} />
        <Text>{props.name}</Text>
      </View>
      <Text>{props.delay}</Text>
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
export default Lane;
