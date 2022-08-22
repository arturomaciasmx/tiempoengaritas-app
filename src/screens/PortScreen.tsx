import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
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
      <SocialPost />
      <SocialPost />
    </View>
  );
};

export default PortScreen;
