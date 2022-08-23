import { StyleSheet, Text, TouchableOpacity } from "react-native";
// import auth from "@react-native-firebase/auth";

const RegisterButton = ({ email, password }) => {
  // const registerNewUser = () => {
  //   auth()
  //   .createUserWithEmailAndPassword(email, password)
  //   .then(() => {
  //     console.log("User account created & signed in!");
  //   })
  //   .catch(error => {
  //     if(error.code = "auth/email-already-in-use") {
  //       console.log('That email address is already in use!');
  //     }
  //     if (error.code === 'auth/invalid-email') {
  //       console.log('That email address is invalid!');
  //     }
  //     console.error(error);
  //   });
  // }

  return (
    <TouchableOpacity style={styles.button} onPress={() => console.log("register")}>
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
