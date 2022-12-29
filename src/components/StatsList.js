import { View} from "react-native";
import React from "react";
import StatBar from "../components/StatBar";

const StatsList = ({ stats }) => {
  return (
    <View>
      <StatBar
        label="HP"
        data={stats[0].base_stat}
        backgroundColor="#46C2CB"
        trackColor="#3C6255"
      />
      <StatBar
        label="Attack"
        data={stats[1].base_stat}
        trackColor="#850000"
        backgroundColor="#FF597B"
      />
      <StatBar
        label="Defense"
        data={stats[2].base_stat}
        trackColor="#263159"
        backgroundColor="#DAE2B6"
      />
      <StatBar
        label="Special Attack"
        data={stats[3].base_stat}
        backgroundColor="#FF7000"
        trackColor="#540375"
      />
      <StatBar
        label="Special Defense"
        data={stats[4].base_stat}
        backgroundColor="#8D9EFF"
        trackColor="#497174"
      />
      <StatBar
        label="Speed"
        data={stats[5].base_stat}
        backgroundColor="#EB6440"
        trackColor="#D6E4E5"
      />
    </View>
  );
};

export default StatsList;
