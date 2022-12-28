import { View, Text, Button, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
  const { signIn, state } = useContext(AuthContext);
  const [ formQuery, setFormQuery ] = useState({ email: "", password: "" });
  const handleChange = (key, value) => {
    if (!(key in formQuery)) return;
    setFormQuery((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <View>
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
      {state.error && <Text>{state.error}</Text>}
      <Button title="SignIn" onPress={() => signIn(formQuery.email, formQuery.password)} />
    </View>
  );
};

export default Login;
