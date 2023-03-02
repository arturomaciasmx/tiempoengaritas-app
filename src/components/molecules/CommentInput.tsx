import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import { Icon } from "@rneui/base";

interface Props {
  post_id: string;
  afterSetComment: () => void;
}

const CommentInput = (props: Props) => {
  const user = auth().currentUser;
  const [comment, setComment] = useState("");
  const increment = firestore.FieldValue.increment(1);

  function addComment() {
    firestore()
      .collection("comments")
      .add({
        post_id: props.post_id,
        user_uid: user.uid,
        user_name: user.displayName,
        body: comment,
        created_at: firestore.Timestamp.now(),
      })
      .then(() => {
        firestore()
          .collection("posts")
          .doc(props.post_id)
          .update({ comments: increment });
      })
      .then(() => {
        props.afterSetComment();
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputText}
        placeholder="Escribe tu comentario..."
        onChangeText={(text) => setComment(text)}
      />

      <TouchableOpacity
        style={comment.length > 0 ? styles.publishButton : styles.publishButtonDisabled}
        onPress={() => addComment()}
        disabled={comment.length > 0 ? false : true}
      >
        <Icon style={styles.publishButtonText} name="send" color={"#006bf7"} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#fff",
  },
  inputText: {
    fontSize: 16,
    marginBottom: 3,
    backgroundColor: "#f5f7f7",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  publishButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  publishButtonDisabled: {
    opacity: 0.4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  publishButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 3,
    paddingBottom: 5,
    width: "auto",
    color: "#fff",
    borderRadius: 30,
  },
});

export default CommentInput;
