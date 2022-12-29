import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const BevelButton = ({
  title,
  onPress,
  containerStyle,
  style,
  shadowStyle,
}) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={{ ...styles.button, ...style }}
        onPress={onPress}
      >
        <Text style={{ color: "white", fontFamily: "VT323", fontSize: 20 }}>
          {title}
        </Text>
      </TouchableOpacity>
      <View style={{ ...styles.shadow, ...shadowStyle }} />
    </View>
  );
};

export default BevelButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF6E31",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    elevation: 1,
    zIndex: 1,
  },
  shadow: {
    backgroundColor: "#e8652e",
    top: 10,
    left: 0,
    right: 0,
    bottom: 5,
    borderRadius: 10,
    position: "absolute",
  },
});
