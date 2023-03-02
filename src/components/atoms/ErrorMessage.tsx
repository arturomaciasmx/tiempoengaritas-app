import { StyleSheet, Text } from "react-native";

type Props = {
  message: string;
};
const ErrorMessage: React.FC<Props> = (props) => {
  return <Text style={styles.message}>{props.message}</Text>;
};

const styles = StyleSheet.create({
  message: {
    color: "#D63301",
    marginBottom: 20,
  },
});

export default ErrorMessage;
