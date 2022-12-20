import { StyleSheet, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";

interface Props {
  user: string;
  password: string;
  navigation: any;
}

const LoginButton = (props: Props) => {
  console.log(props.navigation);

  function login() {
    auth()
      .signInWithEmailAndPassword(props.user, props.password)
      .then(() => {
        console.log("User logged in!");
        props.navigation.navigate("GaritasStack");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
        }

        console.error(error);
      });
  }

  return (
    <TouchableOpacity style={styles.button} onPress={() => login()}>
      <Text style={styles.buttonText}>ENTRAR</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#006bf7",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "800",
    textAlign: "center",
  },
});
export default LoginButton;
