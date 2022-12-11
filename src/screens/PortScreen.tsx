import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PortHeader from "../components/atoms/PortHeader";
import SocialPost from "../components/molecules/SocialPost";

const PortScreen = ({ route, navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      title: route.params.port.crossing_name,
      headerStyle: {
        backgroundColor: "#006bf7",
      },
      headerTintColor: "#fff",
    });
  });
  return (
    <View>
      <PortHeader {...route} />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("GaritasStackNavigator", {
            screen: "Post",
            params: {
              port: route.params.port.crossing_name,
              number: route.params.port.number,
              lane: route.params.lane.type,
              is_readylane: route.params.lane.is_readylane,
            },
          })
        }
      >
        <View
          style={{
            padding: 10,
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#dadede",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              backgroundColor: "#dadada",
              paddingVertical: 5,
              paddingHorizontal: 11,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 5,
            }}
          >
            J
          </Text>
          <Text
            style={{
              borderWidth: 1,
              borderColor: "#dadede",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 50,
              flex: 1,
            }}
          >
            Social post...
          </Text>
        </View>
      </TouchableOpacity>
      <SocialPost />
      <SocialPost />
    </View>
  );
};

export default PortScreen;
