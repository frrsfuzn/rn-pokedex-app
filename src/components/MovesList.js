import { View, Text, StyleSheet } from "react-native";
import React from "react";

const MovesList = ({ moves }) => {
  return (
    <View style={styles.moves}>
      {moves.map((move) => (
        <View key={move.move.name} style={styles.move}>
          <Text style={styles.moveText}>{move.move.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default MovesList;

const styles = StyleSheet.create({
  moves: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: 'space-evenly',
  },
  move: {
    width: "45%",
    backgroundColor: "#0E5E6F",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  moveText: {
    fontFamily: "VT323",
    color: "white",
    fontSize: 20,
  },
});
