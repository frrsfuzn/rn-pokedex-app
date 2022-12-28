import { View, Text, TextInput, Button } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

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
    <View>
      <Text>Name</Text>
      <TextInput
        value={formQuery.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <Text>Email</Text>
      <TextInput
        value={formQuery.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        value={formQuery.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      <Text>Confirm Password</Text>
      <TextInput
        secureTextEntry={true}
        value={formQuery.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
      />
      {formError && <Text>{formError}</Text>}
      {state.error && <Text>{state.error}</Text>}
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default Register;
