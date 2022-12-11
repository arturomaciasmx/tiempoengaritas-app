import { Text, View, TextInput, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useState } from "react";

const PostScreen = ({ route, navigation }) => {
  const user = auth().currentUser;
  const [post, setPost] = useState("");

  const sendPost = () => {
    firestore()
      .collection("posts")
      .doc()
      .set({
        user_id: user.uid,
        user_name: user.displayName,
        body: post,
        port: {
          port_name: route.params.port,
          number: route.params.number,
          lane: route.params.lane,
          is_readylane: route.params.is_readylane,
        },
        created_at: firestore.Timestamp.now(),
      })
      .then(() => {
        console.log("success");
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingTop: 10,
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
            marginRight: 10,
          }}
        >
          J
        </Text>
        <Text>{user.displayName}</Text>
      </View>

      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "transparent",
            textAlignVertical: "top",
            padding: 10,
            height: 500,
            fontSize: 20,
          }}
          placeholder={"Escribe tu publicacion..."}
          defaultValue={post}
          numberOfLines={4}
          multiline
          blurOnSubmit
          onChangeText={(text) => setPost(text)}
        ></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => sendPost()}
        style={{
          backgroundColor: "#006bf7",
          padding: 20,
          borderRadius: 30,
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: "#ffffff",
            textAlign: "center",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Publicar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostScreen;
