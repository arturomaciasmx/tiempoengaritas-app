import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider, Icon } from "@rneui/themed";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import UserPostInfo from "./UserPostInfo";

interface Props {
  doc: string;
  user: string;
  created_at: string;
  post: string;
  likes: number;
  comments: number;
  openCommentScreen: () => void;
}

const SocialPost = (props: Props) => {
  const currentUser = auth().currentUser;
  const increment = firestore.FieldValue.increment(1);
  const decrement = firestore.FieldValue.increment(-1);
  const [liked, setLiked] = useState(false);

  function addLike() {
    firestore()
      .collection("likes")
      .doc()
      .set({
        user_id: currentUser.uid,
        doc_id: props.doc,
      })
      .then(() => {
        firestore().collection("posts").doc(props.doc).update({ likes: increment });
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
          firestore().collection("posts").doc(props.doc).update({ likes: decrement });
        }
      });
  }

  useEffect(() => {
    firestore()
      .collection("likes")
      .where("user_id", "==", currentUser.uid)
      .where("doc_id", "==", props.doc)
      .get()
      .then((documentSnapshot) => {
        if (!documentSnapshot.empty) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      });
  });

  return (
    <View style={styles.container}>
      <UserPostInfo user={props.user} body={props.post} created_at={props.created_at} />
      <View style={styles.likes_comments}>
        <View style={styles.likes_container}>
          {props.likes > 0 ? (
            <Icon
              size={9}
              reverse={true}
              reverseColor={"#ffffff"}
              name={"thumb-up"}
              color={"#338BFF"}
              type="material"
            />
          ) : null}

          <Text style={styles.likes_number}>
            {props.likes > 0 ? String(props.likes) : ""}
          </Text>
        </View>
        <Text style={styles.comments}>{props.comments} comments</Text>
      </View>
      <Divider />
      <View style={styles.social_buttons}>
        <TouchableOpacity onPress={() => handleLike()}>
          <View style={styles.likes_container}>
            <Icon
              name={liked ? "thumb-up" : "thumb-up-off-alt"}
              type="material"
              color={liked ? "#006bf7" : "#666"}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.openCommentScreen();
          }}
        >
          <Icon name="comment" type="material" color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdfdfd",
    marginBottom: 8,
    padding: 10,
  },
  likes_comments: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 5,
  },
  comments: {
    fontSize: 15,
    color: "#8a8a8a",
  },
  social_buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  likes_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  likes_number: {
    color: "#8a8a8a",
    paddingHorizontal: 1,
    fontSize: 15,
  },
});

export default SocialPost;
