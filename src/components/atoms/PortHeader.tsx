import { Image, StyleSheet, Text, View } from "react-native";

const PortHeader = (props) => {
  return (
    <View>
      <View style={styles.header}>
        <View>
          <Image
            style={{ width: 180, height: 150, resizeMode: "contain" }}
            source={props.route.params.lane.image}
          />
        </View>
        <View>
          <Text style={styles.title}>{props.route.params.lane.type}</Text>
          <Text style={styles.sub}>
            {props.route.params.lane.is_readylane ? "Ready Lane" : "Standard"}
          </Text>
          <Text style={styles.delay}>{props.route.params.lane.delay_minutes}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#006bf7",
    elevation: 15,
    paddingVertical: 20,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    color: "#FFFFFF",
    textTransform: "capitalize",
    fontWeight: "100",
  },
  sub: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  delay: {
    marginTop: 15,
    fontSize: 35,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default PortHeader;
