import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
import UserPostInfo from "../components/molecules/UserPostInfo";
import PostInteractions from "../components/molecules/PostInteractions";
import CommentCard from "../components/molecules/CommentCard";
import CommentInput from "../components/molecules/CommentInput";

const CommentsListScreen = ({ route, navigation }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  function afterSetComment() {
    navigation.pop();
  }

  useEffect(() => {
    const getPost = async () => {
      const postSnapshot = await firestore()
        .collection("posts")
        .doc(route.params.post_id);

      postSnapshot.get().then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setPost(documentSnapshot.data());
        }
      });
    };
    getPost();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsSnapshot = await firestore().collection("comments");
      commentsSnapshot
        .where("post_id", "==", route.params.post_id)
        .onSnapshot((querySnapshot) => {
          let documents = [];
          querySnapshot.forEach((documentSnapshot) => {
            documents.push(documentSnapshot.data());
          });
          setComments(documents);
        });
    };
    fetchComments();
  }, []);

  return (
    <>
      <View style={styles.postHeader}>
        {post ? (
          <>
            <UserPostInfo
              user={post.user_name}
              body={post.body}
              created_at={post.created_at.toDate()}
            />
            <PostInteractions
              doc={route.params.post_id}
              user={post?.user_name}
              created_at={post?.created_at}
              post={post?.body}
              likes={post?.likes}
              comments={post?.comments}
            />
          </>
        ) : null}
      </View>
      <ScrollView>
        {comments.map((comment) => {
          return (
            <CommentCard
              author={comment.user_name}
              body={comment.body}
              created_at={comment.created_at?.toDate()}
            />
          );
        })}
      </ScrollView>
      <CommentInput post_id={route.params.post_id} afterSetComment={afterSetComment} />
    </>
  );
};

const styles = StyleSheet.create({
  postHeader: {
    backgroundColor: "#FFFFFF",
    padding: 15,
  },
});

export default CommentsListScreen;
