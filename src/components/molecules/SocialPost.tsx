import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider, Icon } from "@rneui/themed";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

interface Props {
  doc: string;
  user: string;
  created_at: string;
  post: string;
}
const SocialPost = (props: Props) => {
  const currentUser = auth().currentUser;

  function addLike() {
    firestore()
      .collection("likes")
      .doc()
      .set({
        user_id: currentUser.uid,
        doc_id: props.doc,
      })
      .then(() => {
        console.log("like");
      });
  }

  function handleLike() {
    firestore()
      .collection("likes")
      .where("user_id", "==", currentUser.uid)
      .where("doc_id", "==", props.doc)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.empty) {
          addLike();
        } else {
          documentSnapshot.docs[0].ref.delete();
          console.log("unlike");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

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
      </View>
      <View>
        <Text style={styles.post_body}>{props.post}</Text>
      </View>
      <View style={styles.likes_comments}>
        <Text>Likes</Text>
        <Text style={styles.comments}>10 comments</Text>
      </View>
      <Divider />
      <View style={styles.social_buttons}>
        <TouchableOpacity onPress={() => handleLike()}>
          <Icon name="thumb-up-off-alt" type="material" color="#666" />
        </TouchableOpacity>
        <Icon name="comment" type="material" color="#666" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdfdfd",
    marginBottom: 15,
    padding: 10,
  },
  header: {},
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
  likes_comments: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 5,
  },
  comments: {
    fontSize: 13,
    color: "#8a8a8a",
  },
  social_buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default SocialPost;
