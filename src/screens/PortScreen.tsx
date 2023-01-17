import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PortHeader from "../components/atoms/PortHeader";
import SocialPost from "../components/molecules/SocialPost";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { ScrollView } from "react-native-gesture-handler";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GaritasStackProps } from "../navigation/GaritasStack";
import { AppStackProps } from "../navigation/AppStack";
import { CompositeScreenProps } from "@react-navigation/native";

// type Props = NativeStackScreenProps<AppStackProps, "GaritasStackNavigator">;
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

  function openCommentScreen(post) {
    navigation.navigate("GaritasStackNavigator", {
      screen: "Comment",
      params: {
        user_name: post.data().user_name,
        post_id: post.id,
      },
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <PortHeader {...route} />

      <TouchableOpacity onPress={() => handleSocialPostAccess()}>
        <View
          style={{
            padding: 10,
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#dadede",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              backgroundColor: "#dadada",
              paddingVertical: 5,
              paddingHorizontal: 11,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 5,
            }}
          >
            J
          </Text>
          <Text
            style={{
              borderWidth: 1,
              borderColor: "#dadede",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 50,
              flex: 1,
            }}
          >
            Social post...
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {posts.map((post) => {
            return (
              <SocialPost
                doc={post.id}
                user={post.data().user_name}
                created_at={post.data().created_at}
                post={post.data().body}
                likes={post.data().likes}
                comments={post.data().comments}
                openCommentScreen={() => openCommentScreen(post)}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default PortScreen;
