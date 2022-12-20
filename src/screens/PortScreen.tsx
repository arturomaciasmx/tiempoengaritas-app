import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PortHeader from "../components/atoms/PortHeader";
import SocialPost from "../components/molecules/SocialPost";
import firestore from "@react-native-firebase/firestore";
import { ScrollView } from "react-native-gesture-handler";

const PortScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

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
      const postsSnapshot = await firestore().collection("posts").get();
      let documents = [];
      postsSnapshot.forEach((doc) => {
        documents.push(doc.data());
      });
      if (subscribed) {
        setPosts(documents);
      }
    };

    fetchPosts();

    return () => {
      subscribed = false;
    };
  }, [route]);

  return (
    <View style={{ flex: 1 }}>
      <PortHeader {...route} />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("GaritasStackNavigator", {
            screen: "Post",
            params: {
              port: route.params.port.crossing_name,
              number: route.params.port.number,
              lane: route.params.lane.type,
              is_readylane: route.params.lane.is_readylane,
            },
          })
        }
      >
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
                user={post.user_name}
                created_at={post.created_at}
                post={post.body}
                key={post.user_id + post.created_at.seconds}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default PortScreen;
