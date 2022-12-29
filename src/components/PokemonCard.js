import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import useFetchPokemon from "../hooks/useFetchPokemon";
import { useNavigation } from "@react-navigation/native";
import TypePil from "./TypePil";
import { LinearGradient } from "expo-linear-gradient";
import { mapTypeToColor } from "../utils/colors";
import whitePokemonBall from "../../assets/WhitePokemonBall.png";

const PokemonCard = ({ pokemonName }) => {
  const { data, isLoading, isError } = useFetchPokemon(pokemonName);
  const navigation = useNavigation();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  const colorGradient =
    data.types.length > 1
      ? data.types.map((type) => mapTypeToColor(type.type.name))
      : [
          mapTypeToColor(data.types[0].type.name),
          mapTypeToColor(data.types[0].type.name),
        ];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { name: data.name })}
    >
      <LinearGradient
        colors={colorGradient}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.container}
      >
        <Text style={styles.text}>#{data.id}</Text>
        <Text style={styles.text}>{data.name}</Text>
        <Text style={styles.text}>type:</Text>
        <View style={styles.types}>
          {data.types.map((type) => (
            <TypePil key={type.type.name} name={type.type.name} />
          ))}
        </View>

        <Image
          source={{ uri: data.sprites.other.home.front_default }}
          style={styles.image}
        />
        <View style={styles.whitePokemonBallContainer}>
          <Image source={whitePokemonBall} style={styles.whitePokemonBall} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 105,
    marginTop: 40,
    paddingHorizontal: 13,
    paddingVertical: 8,
    elevation: 1,
    borderRadius: 10,
  },
  whitePokemonBallContainer: {
    position: "absolute",
    borderRadius: 10,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'hidden'
  },
  whitePokemonBall: {
    width: 100,
    height: 100,
    position: 'absolute',
    right:-20,
    top: -20,
    opacity: 0.5
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
    zIndex: 5,
    elevation: 5
  },
  types: {
    flexDirection: "row",
    marginTop: 5,
  },
});
