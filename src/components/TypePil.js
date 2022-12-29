import { View, Text, StyleSheet } from "react-native";
import React from "react";

const TypePil = ({ name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

export default TypePil;

const styles = StyleSheet.create({
  container: { padding: 5, backgroundColor: "salmon", borderRadius: 10, marginRight: 5 },
  text: { fontFamily: "VT323", lineHeight: 12, letterSpacing:1, color: 'white'},
});
