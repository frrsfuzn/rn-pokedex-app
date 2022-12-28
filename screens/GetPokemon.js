import React, { useState, useCallback } from "react";
import { Button, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useFetchPokemon from "../Hooks/useFetchPokemon";

function GetPokemon() {
  const [pokemonNumber, setPokemonNumber] = useState(null);
  const { data, isLoading } = useFetchPokemon(pokemonNumber, !!pokemonNumber);
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (isActive) {
        setPokemonNumber(null);
      }
      return () => {
        isActive = false;
      };
    }, [])
  );
  const handleGetRandomPokemon = () => {
    const random = Math.floor(Math.random() * 800);
    setPokemonNumber(random);
  };
  return (
    <View>
      {pokemonNumber ? (
        isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <View>
            <Text>You get a pokemon!</Text>
            <Text>Name: {data.name}</Text>
            <Text>Weight: {data.weight}</Text>
          </View>
        )
      ) : (
        <Text>Get Your Pokemon Now!</Text>
      )}
      <Button title="Get Random Pokemon!" onPress={handleGetRandomPokemon} />
    </View>
  );
}

export default GetPokemon;
