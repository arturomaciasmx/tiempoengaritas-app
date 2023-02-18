import { Divider } from "@rneui/themed";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useState } from "react";

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
    <View>
      <TextInput
        style={styles.inputText}
        placeholder="Deja aqui tu comentario.."
        onChangeText={(text) => setComment(text)}
      />
      <Divider />
      <TouchableOpacity style={styles.publishButton} onPress={() => addComment()}>
        <Text style={styles.publishButtonText}>Publicar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    fontSize: 16,
    marginBottom: 3,
  },
  publishButton: {
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
    paddingHorizontal: 15,
    width: "auto",
    backgroundColor: "#006bf7",
    color: "#fff",
    borderRadius: 30,
  },
});

export default CommentInput;
