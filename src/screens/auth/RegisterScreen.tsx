import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, TextInput, View, Image } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import RegisterButton from "../../components/molecules/RegisterButton";
import { setErrors } from "../../redux/authSlice";

const logo = require("../../../assets/icon.png");

const RegisterScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const error = useAppSelector((state) => state.auth.errors);

  useEffect(() => {
    console.log("...", error);
  }, [error]);

  const goLogin = () => {
    dispatch(setErrors(""));
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.title}>CREAR UNA CUENTA</Text>
        {error != "" ? <ErrorMessage message={error} /> : null}
        <View style={styles.input}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Correo electrónico"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Nombre"
          />
        </View>
        <View style={styles.input}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            secureTextEntry={true}
          />
        </View>
        <RegisterButton email={email} password={password} displayName={displayName} />

        <View>
          <Text style={{ textAlign: "center", marginTop: 15 }}>
            ¿Ya tienes una cuenta?
          </Text>
          <TouchableOpacity onPress={goLogin}>
            <Text style={{ textAlign: "center", color: "#006bf7", fontWeight: "800" }}>
              Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 0,
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 60,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
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
  },
});

export default RegisterScreen;
