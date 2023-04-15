import {
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useLayoutEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { GaritasStackProps } from "../app/types";
import { Icon } from "@rneui/base";
import storage from "@react-native-firebase/storage";
import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<GaritasStackProps, "Post">;

const PostScreen = ({ route, navigation }: Props) => {
  const user = auth().currentUser;
  const [imgUri, setImgUri] = useState<string | null>(null);
  const [body, setBody] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight() {
        return (
          <TouchableOpacity
            onPress={() => sendPost()}
            style={body.length > 0 ? styles.button : styles.buttonDisabled}
            disabled={body.length > 0 ? false : true}
          >
            <Text style={styles.button_text}>PUBLICAR</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [navigation, body]);

  async function sendPost() {
    firestore()
      .collection("posts")
      .add({
        user_id: user.uid,
        user_name: user.displayName,
        body: body,
        port: route.params.port,
        lane: route.params.lane,
        created_at: firestore.Timestamp.now(),
        image: await handleUploadImage(),
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleUploadImage = async () => {
    if (!imgUri) {
      return "";
    }
    const pathToFile = `posts/${Date.now()}`;
    const reference = storage().ref(pathToFile);
    await reference.putFile(imgUri);
    const url = await storage().ref(pathToFile).getDownloadURL();
    return url;
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      quality: 0.3,
      aspect: [1, 1],
    });

    //@ts-ignore
    if (!result.canceled) {
      //@ts-ignore
      setImgUri(result.uri);
    }
  };

  const removeImage = () => {
    setImgUri(null);
  };

  return (
    <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <View style={styles.profile}>
          <Icon name="perm-identity" style={styles.profile_image} />
          <Text style={{ fontSize: 18 }}>{user.displayName}</Text>
        </View>

        <Icon
          color="#333"
          containerStyle={{}}
          disabledStyle={{}}
          iconStyle={{}}
          name="camera"
          onPress={() => openCamera()}
          size={20}
          type="font-awesome"
        />
      </View>

      <ScrollView>
        <TextInput
          style={styles.input_text}
          placeholder={"Escribe tu publicación..."}
          defaultValue={body}
          numberOfLines={1}
          multiline
          blurOnSubmit
          onChangeText={(text) => setBody(text)}
        ></TextInput>
        {imgUri && (
          <View>
            <Image
              source={{ uri: imgUri }}
              style={{
                width: "100%",
                height: 600,
                resizeMode: "cover",
                marginTop: 20,
                position: "relative",
              }}
            />
            <View style={{ position: "absolute", right: 10, top: 30 }}>
              <Icon
                color="#fff"
                containerStyle={{}}
                disabledStyle={{}}
                iconStyle={{}}
                name="close"
                onPress={() => removeImage()}
                size={25}
                type="font-awesome"
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
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
    fontSize: 20,
  },
  button: {
    backgroundColor: "#006bf7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  buttonDisabled: {
    opacity: 0.4,
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
