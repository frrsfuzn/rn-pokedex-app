import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import CustomInput from "../components/CustomInput";
import BevelButton from "../components/BevelButton";

const Register = () => {
  const [formQuery, setFormQuery] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState(null);
  const { signUp, state } = useContext(AuthContext);
  const handleChange = (key, value) => {
    if (!(key in formQuery)) return;
    setFormQuery((prev) => ({ ...prev, [key]: value }));
  };
  const handleRegister = () => {
    const { name, email, password, confirmPassword } = formQuery;
    if (email === "" || password === "" || confirmPassword === "") {
      setFormError("Form cannot be empty!");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Password confirmation is not same");
      return;
    }
    setFormError(null);
    signUp(name, email, password);
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <CustomInput
          value={formQuery.name}
          onChangeText={(text) => handleChange("name", text)}
          placeholder="Name"
          style={styles.textInput}
        />
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
        <CustomInput
          secureTextEntry={true}
          value={formQuery.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          placeholder="Confirm Password"
          style={styles.textInput}
        />
        {formError && <Text style={styles.error}>{formError}</Text>}
        {state.error && <Text style={styles.error}>{state.error}</Text>}
        <BevelButton
          containerStyle={styles.button}
          title="Register"
          onPress={handleRegister}
        />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  error: {
    color: "#EB455F",
  },
});
