import { StyleSheet, Text, View } from "react-native";

interface Props {
  user: string;
  created_at: string;
  post: string;
}
const SocialPost = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.posted_by}>
          <View style={styles.profile_image_container}>
            <Text style={styles.profile_image}>J</Text>
          </View>
          <View>
            <Text>Posted by {props.user}</Text>
            <Text>2d ago</Text>
          </View>
        </View>
        <View>
          <Text style={styles.post_body}>{props.post}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdfdfd",
    marginBottom: 15,
  },
  header: {
    padding: 10,
  },
  posted_by: {
    flexDirection: "row",
    alignItems: "center",
  },
  profile_image_container: {
    alignItems: "flex-start",
    marginRight: 15,
  },
  profile_image: {
    backgroundColor: "#cdcdca",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  post_body: {
    marginTop: 15,
  },
});

export default SocialPost;
