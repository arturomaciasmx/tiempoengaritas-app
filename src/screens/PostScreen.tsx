import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useLayoutEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GaritasStackProps } from "../app/types";
import { Icon } from "@rneui/base";

type Props = NativeStackScreenProps<GaritasStackProps, "Post">;

const PostScreen = ({ route, navigation }: Props) => {
  const user = auth().currentUser;
  const [body, setBody] = useState("test");

  function sendPost() {
    firestore()
      .collection("posts")
      .add({
        user_id: user.uid,
        user_name: user.displayName,
        body: body,
        port: route.params.port,
        lane: route.params.lane,
        created_at: firestore.Timestamp.now(),
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight() {
        return (
          <TouchableOpacity onPress={() => sendPost()} style={styles.button}>
            <Text style={styles.button_text}>PUBLICAR</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, body]);
  console.log(body);

  return (
    <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <View style={styles.profile}>
        <Icon name="perm-identity" style={styles.profile_image} />
        <Text style={{ fontSize: 18 }}>{user.displayName}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.input_text}
          placeholder={"Escribe tu publicación..."}
          // defaultValue={post}
          // numberOfLines={4}
          // multiline
          // blurOnSubmit
          onChangeText={(text) => setBody(text)}
        ></TextInput>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 20,
  },
  profile_image: {
    backgroundColor: "#dadada",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  input_text: {
    borderWidth: 1,
    borderColor: "transparent",
    textAlignVertical: "top",
    padding: 15,
    height: 500,
    fontSize: 20,
  },
  button: {
    backgroundColor: "#006bf7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  button_text: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
export default PostScreen;
