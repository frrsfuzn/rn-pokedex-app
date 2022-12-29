import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ProgressBar from "react-native-animated-progress";

const StatBar = ({ label, data, backgroundColor, trackColor }) => {
  return (
    <View style={styles.statContainer}>
      <View style={styles.statLabel}>
        <Text>{label}</Text>
        <Text>{data}</Text>
      </View>
      <ProgressBar
        progress={(data/255) * 100}
        height={7}
        backgroundColor={backgroundColor}
        trackColor={trackColor}
        animated={false}
      />
    </View>
  );
};

export default StatBar;

const styles = StyleSheet.create({
  statContainer: {
    marginBottom: 10,
  },
  statLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
