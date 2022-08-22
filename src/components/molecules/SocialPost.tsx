import { StyleSheet, Text, View } from "react-native";

const SocialPost = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.posted_by}>
          <View style={styles.profile_image_container}>
            <Text style={styles.profile_image}>J</Text>
          </View>
          <View>
            <Text>Posted by Joel Macias</Text>
            <Text>2d ago</Text>
          </View>
        </View>
        <View>
          <Text style={styles.post_body}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, ullam sequi
            voluptatibus quis veniam minima sunt veritatis quaerat eaque neque culpa nemo
            nisi incidunt modi! Autem odit doloremque veritatis minima.
          </Text>
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
    paddingTop: 10,
    paddingBottom: 10,
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
