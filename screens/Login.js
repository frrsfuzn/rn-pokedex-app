import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const { signIn, state } = useContext(AuthContext);
  const [formQuery, setFormQuery] = useState({ email: "", password: "" });
  const navigation = useNavigation();
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
      <Button
        title="SignIn"
        onPress={() => signIn(formQuery.email, formQuery.password)}
      />
      <View style={styles.footer}>
        <Text>Doesn't have an account? </Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
          <Text>Click here to register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
  }
});