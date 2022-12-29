import { View, Text, StyleSheet } from "react-native";
import React from "react";

const InfoList = ({ data }) => {
  return (
    <View style={styles.info}>
      <View style={styles.infoData}>
        <Text>Height</Text>
        <Text>Weight</Text>
        <Text>Abilities</Text>
      </View>
      <View style={styles.infoData}>
        <Text>{data.height}"</Text>
        <Text>{data.weight} lbs</Text>
        <View style={styles.abilities}>
          {data.abilities.map((ability, index) => {
            const abilityName = ability.ability.name;
            const abilityDisplay =
              abilityName + (index === data.abilities.length - 1 ? "" : ", ");
            return <Text key={abilityName}>{abilityDisplay}</Text>;
          })}
        </View>
      </View>
    </View>
  );
};

export default InfoList;

const styles = StyleSheet.create({
  info: {
    flexDirection: "row",
  },
  infoData: {
    marginRight: 30,
    height: 80,
    justifyContent: "space-evenly",
  },
  abilities: {
    flexDirection: "row",
  },
});
