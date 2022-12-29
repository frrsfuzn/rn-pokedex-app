import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import useFetchPokemon from "../hooks/useFetchPokemon";
import { useNavigation } from "@react-navigation/native";
import TypePil from "./TypePil";

const PokemonCard = ({ pokemon }) => {
  console.log(pokemon);
  const { data, isLoading, isError } = useFetchPokemon(pokemon.name);
  const navigation = useNavigation();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Details", { name: data.name })}
    >
      <Text style={styles.text}>#{data.id}</Text>
      <Text style={styles.text}>{data.name}</Text>
      <Text style={styles.text}>type:</Text>
      <View style={styles.types}>
        {data.types.map((type) => (
          <TypePil name={type.type.name} />
        ))}
      </View>

      <Image
        source={{ uri: data.sprites.other.home.front_default }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#A2D7C7",
    width: 150,
    height: 105,
    // marginBottom: 20,
    marginTop: 40,
    paddingHorizontal: 13,
    paddingVertical: 8,
    elevation: 1,
    borderRadius: 10,
  },
  text: {
    fontFamily: "VT323",
    color: "white",
    fontSize: 20,
    lineHeight: 20,
  },
  image: {
    width: 75,
    height: 75,
    position: "absolute",
    right: 0,
    top: -40,
  },
  types: {
    flexDirection: 'row',
    marginTop: 5
  }
});
