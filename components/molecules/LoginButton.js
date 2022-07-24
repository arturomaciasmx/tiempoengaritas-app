import { StyleSheet, Text, TouchableOpacity } from "react-native";


const LoginButton = () => {
  return ( 
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>ENTRAR</Text>
    </TouchableOpacity>
   );
}

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
  }
})
export default LoginButton;