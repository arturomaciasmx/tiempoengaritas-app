import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon } from "@rneui/themed";
import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, TextInput, View, Image } from "react-native";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AuthStackProps } from "../../app/types";
import ErrorMessage from "../../components/atoms/ErrorMessage";
import LoginButton from "../../components/molecules/LoginButton";
import ResetPasswordButton from "../../components/molecules/ResetPaswordButton";
import { setErrors } from "../../redux/authSlice";

type Props = NativeStackScreenProps<AuthStackProps, "Login">;
const logo = require("../../../assets/icon.png");

const ResetPasswordScreen = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const error = useAppSelector((state) => state.auth.errors);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setEmail("");
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

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <View>
        <Text style={styles.title}>RESTABLECER CONTRASEÑA</Text>
        {error != "" ? <ErrorMessage message={error} /> : null}
        <View style={styles.input}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Correo electrónico"
          />
        </View>

        {/* Button to handle all the login logic */}
        <ResetPasswordButton email={email} navigation={navigation} />
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
});

export default ResetPasswordScreen;
