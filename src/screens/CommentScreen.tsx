import { StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import UserPostInfo from "../components/molecules/UserPostInfo";
import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import CommentInput from "../components/molecules/CommentInput";
import { GaritasStackProps } from "../app/types";

type Props = NativeStackScreenProps<GaritasStackProps, "Comment">;

const CommentScreen = ({ route, navigation }: Props) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    firestore()
      .collection("posts")
      .doc(route.params.post_id)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setPost(documentSnapshot.data());
        }
      });
  }, []);

  function afterSetComment() {
    navigation.pop();
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <UserPostInfo user={route.params.user_name} />
      </View>
      <CommentInput post_id={route.params.post_id} afterSetComment={afterSetComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
});

export default CommentScreen;
