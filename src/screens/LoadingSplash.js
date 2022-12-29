import { View, Text, StyleSheet } from "react-native";
import React from "react";

const LoadingSplash = () => {
  return (
    <View style={styles.container}>
      <Text>Loading ...</Text>
    </View>
  );
};

export default LoadingSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
