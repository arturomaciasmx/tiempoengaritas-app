import { StyleSheet, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authError, setErrors } from "../../redux/authSlice";
import { useEffect } from "react";

interface Props {
  email: string;
  password: string;
  displayName: string;
  navigation: any;
}
const RegisterButton = (props: Props) => {
  const dispatch = useAppDispatch();

  const registerNewUser = () => {
    if (props.email && props.password && props.displayName) {
      auth()
        .createUserWithEmailAndPassword(props.email, props.password)
        .then((userCredential) => {
          return userCredential.user
            .updateProfile({
              displayName: props.displayName,
            })
            .then(() => props.navigation.navigate("GaritasStack"));
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            console.log("That email address is already in use!");
            dispatch(setErrors("Este correo ya está en uso"));
          }
          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
            dispatch(setErrors("El correo es inválido"));
          }
          if (error.code === "auth/weak-password") {
            console.log("The given password is invalid.");
            dispatch(setErrors("La contraseña debe tener al menos 6 caracteres"));
          }
          console.error(error);
        });
    } else {
      dispatch(setErrors("Todos los campos son requeridos"));
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={() => registerNewUser()}>
      <Text style={styles.buttonText}>REGISTRARSE</Text>
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
export default RegisterButton;
