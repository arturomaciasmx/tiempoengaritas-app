import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppStackProps } from "../../navigation/AppStack";

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
  const navigation = useNavigation<NativeStackNavigationProp<AppStackProps>>();
  let image = Images.vehicular;

  if (props.status == "N/A") return null;

  props.type == "vehicular" ? (image = Images.vehicular) : (image = Images.peatonal);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("GaritasStackNavigator", { screen: "Port" });
      }}
    >
      <View style={styles.lane}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={{ width: 50, height: 40, marginRight: 10 }} source={image} />
          <Text>{props.name}</Text>
        </View>
        <Text>{props.delay}</Text>
      </View>
    </TouchableOpacity>
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
