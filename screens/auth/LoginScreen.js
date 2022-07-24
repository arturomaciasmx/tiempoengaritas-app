import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, View } from "react-native";
import LoginButton from "../../components/molecules/LoginButton";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const goRegister = () => {
    navigation.navigate("Register");
  }

  return (
    <View style={styles.container}>
      <View>

        <Text style={styles.title}>Inicia Sesion</Text>
        <View style={styles.input}>
          <TextInput value={email} onChangeText={setEmail} placeholder="Correo" />
        </View>
        <View style={styles.input}>
          <TextInput value={password} onChangeText={setEmail} placeholder="Contraseña" />
        </View>
        <LoginButton />

        <View>
          <Text style={{textAlign: "center", marginTop: 15}}>No tienes una cuenta?</Text>
          <TouchableOpacity onPress={goRegister}>
            <Text style={{textAlign: "center", color: "#006bf7", fontWeight: "800"}}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
   );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 30,
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
    textTransform: "uppercase",
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#dadada",
    borderWidth: 1,
    marginBottom: 30,
    borderRadius: 10,
  }
})

export default LoginScreen;