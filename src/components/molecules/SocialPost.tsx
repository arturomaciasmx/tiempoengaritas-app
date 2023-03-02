import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Divider, Icon } from "@rneui/themed";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import UserPostInfo from "./UserPostInfo";
import PostInteractions from "./PostInteractions";

interface Props {
  doc: string;
  user: string;
  created_at: string;
  post: string;
  likes: number;
  comments: number;
  openCommentsListScreen: () => void;
}

const SocialPost = (props: Props) => {
  const currentUser = auth().currentUser;

  return (
    <View style={styles.container}>
      <UserPostInfo user={props.user} body={props.post} created_at={props.created_at} />
      {currentUser ? (
        <PostInteractions
          comments={props.comments}
          created_at={props.created_at}
          doc={props.doc}
          likes={props.likes}
          post={props.post}
          user={props.user}
          openCommentsListScreen={props.openCommentsListScreen}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdfdfd",
    marginTop: 8,
    padding: 16,
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
