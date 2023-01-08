import { Text, View } from "react-native";
import { GaritasStackProps } from "../navigation/GaritasStack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<GaritasStackProps, "Comment">;

const CommentScreen = ({ route, navigation }: Props) => {
  return <View style={{ flex: 1, backgroundColor: "#ffffff" }}></View>;
};

export default CommentScreen;
