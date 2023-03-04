import { StyleSheet, Text, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { useAppDispatch } from "../../app/hooks";
import { setErrors } from "../../redux/authSlice";

interface Props {
  user: string;
  password: string;
  navigation: any;
}

const LoginButton = (props: Props) => {
  const dispatch = useAppDispatch();

  function login() {
    if (props.user && props.password) {
      auth()
        .signInWithEmailAndPassword(props.user, props.password)
        .then(() => {
          console.log("User logged in!");
          props.navigation.navigate("GaritasStack");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
            dispatch(setErrors("El correo es inválido"));
          }

          if (error.code === "auth/user-not-found") {
            console.log("There is no user record corresponding to this identifier.");
            dispatch(setErrors("Usuario no registrado"));
          }

          if (error.code === "auth/wrong-password") {
            console.log("The password is invalid or the user does not have a password.");
            dispatch(setErrors("Contraseña incorrecta"));
          }

          if (error.code === "auth/too-many-requests") {
            console.log(
              " Access to this account has been temporarily disabled due to many failed login attempts."
            );
            dispatch(
              setErrors(
                "El acceso a esta cuenta se ha deshabilitado temporalmente debido a muchos intentos de inicio de sesión fallidos."
              )
            );
          }

          console.error(error);
        });
    } else {
      dispatch(setErrors("Todos los campos son requeridos"));
    }
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
