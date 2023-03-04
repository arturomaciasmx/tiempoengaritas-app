import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, View, Image } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthStackProps } from "../../app/types";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import LoginButton from "../../components/molecules/LoginButton";
import { setErrors } from "../../redux/authSlice";

type Props = NativeStackScreenProps<AuthStackProps, "Login">;
const logo = require("../../../assets/icon.png");

const LoginScreen = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = useAppSelector((state) => state.auth.errors);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setEmail("");
      setPassword("");
      dispatch(setErrors(""));
    });
    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft(props) {
        return (
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="arrow-back" />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  const goRegister = () => {
    dispatch(setErrors(""));
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.title}>INICIA SESIÓN</Text>
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
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            secureTextEntry={true}
          />
        </View>

        {/* Button to handle all the login logic */}
        <LoginButton user={email} password={password} navigation={navigation} />

        <View>
          <Text style={{ textAlign: "center", marginTop: 15 }}>
            ¿No tienes una cuenta?
          </Text>
          <TouchableOpacity onPress={goRegister}>
            <Text style={{ textAlign: "center", color: "#006bf7", fontWeight: "800" }}>
              Regístrate 
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 40 }}
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <Text style={styles.resetPassword}>Olvide mi contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 30,
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
  resetPassword: {
    textAlign: "center",
    fontSize: 13,
  },
});

export default LoginScreen;
