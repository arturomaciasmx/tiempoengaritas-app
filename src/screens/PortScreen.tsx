import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PortHeader from "../components/atoms/PortHeader";
import SocialPost from "../components/molecules/SocialPost";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackProps } from "../navigation/AppStack";
import { CompositeScreenProps } from "@react-navigation/native";
import { GaritasStackProps } from "../app/types";
import { Icon } from "@rneui/base";

type Props = CompositeScreenProps<
  NativeStackScreenProps<GaritasStackProps, "Post">,
  NativeStackScreenProps<AppStackProps>
>;
const PortScreen = ({ route, navigation }: Props) => {
  const [posts, setPosts] = useState([]);
  const currentUser = auth().currentUser;

  function handleSocialPostAccess() {
    if (!currentUser) {
      navigation.navigate("DefaultDrawerNavigator", {
        screen: "AuthStackScreen",
      });
    } else {
      navigation.navigate("GaritasStackNavigator", {
        screen: "Post",
        params: {
          lane: {
            type: route.params.lane.type,
            is_readylane: route.params.lane.is_readylane,
          },
          port: {
            crossing_name: route.params.port.crossing_name,
            number: route.params.port.number,
          },
        },
      });
    }
  }

  useEffect(() => {
    navigation.setOptions({
      title: route.params.port.crossing_name,
      headerStyle: {
        backgroundColor: "#006bf7",
      },
      headerTintColor: "#fff",
    });
  });

  useEffect(() => {
    let subscribed = true;

    const fetchPosts = async () => {
      const postsSnapshot = await firestore().collection("posts");
      postsSnapshot
        .where("port.number", "==", route.params.port.number)
        .where("lane.type", "==", route.params.lane.type)
        .where("lane.is_readylane", "==", route.params.lane.is_readylane)
        .orderBy("created_at", "desc")
        .onSnapshot(
          (querySnapshot) => {
            let documents = [];
            querySnapshot.forEach((doc) => {
              documents.push(doc);
            });
            if (subscribed) {
              setPosts(documents);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    };

    fetchPosts();

    return () => {
      subscribed = false;
    };
  }, [navigation]);

  function openCommentsListScreen(post_id: string) {
    navigation.navigate("GaritasStackNavigator", {
      screen: "CommentsList",
      params: {
        post_id: post_id,
      },
    });
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#ddd" }}>
      <PortHeader {...route} />

      <TouchableOpacity onPress={() => handleSocialPostAccess()}>
        <View style={styles.container}>
          <Icon name="perm-identity" style={styles.profile_image} />
          <Text style={styles.text}>Escribe tu publicación...</Text>
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {posts.map((postDoc) => {
            const post = postDoc.data();
            return (
              <SocialPost
                doc={postDoc.id}
                user={post.user_name}
                created_at={post.created_at.toDate()}
                post={post.body}
                likes={post.likes}
                comments={post.comments}
                openCommentsListScreen={() => openCommentsListScreen(postDoc.id)}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#dadede",
    flexDirection: "row",
    alignItems: "center",
  },
  profile_image: {
    backgroundColor: "#cdcdca",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  text: {
    borderWidth: 1,
    borderColor: "#dadede",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    flex: 1,
    color: "#8a8a8a",
  },
});

export default PortScreen;
