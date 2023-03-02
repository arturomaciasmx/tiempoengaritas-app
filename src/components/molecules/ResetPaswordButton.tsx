import { StyleSheet, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { useAppDispatch } from "../../app/hooks";
import { setErrors } from "../../redux/authSlice";

interface Props {
  email: string;
  navigation: any;
}

const ResetPasswordButton = (props: Props) => {
  const dispatch = useAppDispatch();

  function resetPassword() {
    auth()
      .sendPasswordResetEmail(props.email)
      .then(() => {
        props.navigation.navigate("Login");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
          dispatch(setErrors("El correo es inválido"));
        }
        console.log(error);
      });
  }

  return (
    <TouchableOpacity style={styles.button} onPress={() => resetPassword()}>
      <Text style={styles.buttonText}>ENVIAR</Text>
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
export default ResetPasswordButton;
