import { StyleSheet, Text, View } from "react-native";

interface Props {
  user: string;
  body: string;
}

const UserPostInfo = ({ user, body }: Props) => {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.posted_by}>
          <View style={styles.profile_image_container}>
            <Text style={styles.profile_image}>J</Text>
          </View>
          <View>
            <Text style={styles.user_name}>{user}</Text>
            <Text style={styles.post_date}>2d ago</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.post_body}>{body}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {},
  posted_by: {
    flexDirection: "row",
    alignItems: "center",
  },
  user_name: {
    fontSize: 18,
  },
  post_date: {
    fontSize: 12,
    color: "#8a8a8a",
  },
  profile_image_container: {
    alignItems: "flex-start",
    marginRight: 15,
  },
  profile_image: {
    backgroundColor: "#cdcdca",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 50,
  },
  post_body: {
    marginTop: 15,
    fontSize: 18,
  },
});

export default UserPostInfo;
