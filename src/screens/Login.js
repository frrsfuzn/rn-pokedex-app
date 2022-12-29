import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import BevelButton from "../components/BevelButton";
import CustomInput from "../components/CustomInput";

const Login = () => {
  const { signIn, state } = useContext(AuthContext);
  const [formQuery, setFormQuery] = useState({ email: "", password: "" });
  const navigation = useNavigation();
  const handleChange = (key, value) => {
    if (!(key in formQuery)) return;
    setFormQuery((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontFamily: "VT323", fontSize: 40, marginBottom: 30}}>Welcome to Pokedex!</Text>
      <View style={styles.form}>
        <CustomInput
          value={formQuery.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="Email"
          style={styles.textInput}
        />
        <CustomInput
          secureTextEntry={true}
          value={formQuery.password}
          onChangeText={(text) => handleChange("password", text)}
          placeholder="Password"
          style={styles.textInput}
        />
        {state.error && <Text style={styles.error}>{state.error}</Text>}
        <BevelButton
          title="Sign In"
          onPress={() => signIn(formQuery.email, formQuery.password)}
          containerStyle={styles.button}
        />
        <View style={styles.footer}>
          <Text>Doesn't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.register}>Click here to register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: 300,
  },
  button: {
    marginTop: 15,
    marginBottom: 10,
  },
  textInput: {
    marginBottom: 10,
  },
  register: {
    color: "#678983",
    fontWeight: "bold",
  },
  error: {
    color: "#EB455F",
  },
  footer: {
    justifyContent: "center",
    flexDirection: "row",
  },
});
