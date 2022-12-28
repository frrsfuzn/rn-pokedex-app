import { TextInput, StyleSheet } from "react-native";
import React from "react";

const CustomInput = (props) => {
  return (
    <TextInput {...props} style={{ ...styles.textInput, ...props.style }}  />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderColor: "#aaa",
    paddingVertical: 10
  },
});
