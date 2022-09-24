import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import PortHeader from "../components/atoms/PortHeader";
import SocialPost from "../components/molecules/SocialPost";
import { GaritasStackProps } from "../navigation/GaritasStack";

type Props = NativeStackScreenProps<GaritasStackProps, "Port">;

const PortScreen = (props: Props) => {
  props.navigation.setOptions({
    title: props.route.params.port.crossing_name,
    headerStyle: {
      backgroundColor: "#006bf7",
    },
    headerTintColor: "#fff",
  });
  return (
    <View>
      <PortHeader {...props} />

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

      <SocialPost />
      <SocialPost />
    </View>
  );
};

export default PortScreen;
