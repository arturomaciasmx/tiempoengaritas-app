import { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, TextInput, View } from "react-native";
import RegisterButton from "../../components/molecules/RegisterButton";

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const goLogin = () => {
    navigation.navigate("Login")
  }

  return (
    <View style={styles.container}>
      <View>

        <Text style={styles.title}>Registrate</Text>
        <View style={styles.input}>
          <TextInput value={email} onChangeText={setEmail} placeholder="Correo" />
        </View>
        <View style={styles.input}>
          <TextInput value={password} onChangeText={setPassword} placeholder="Contraseña" />
        </View>
        <RegisterButton email={email} password={password} />

        <View>
          <Text style={{textAlign: "center", marginTop: 15}}>Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={goLogin}>
            <Text style={{textAlign: "center", color: "#006bf7", fontWeight: "800"}}>Inicia sesion</Text>
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

export default RegisterScreen
;