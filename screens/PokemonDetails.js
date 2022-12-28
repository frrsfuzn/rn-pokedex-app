import React from "react";
import { Button, Text, View } from "react-native";
import useFetchPokemon from "../hooks/useFetchPokemon";

function Details({ route }) {
  const { name } = route.params;
  const { data, isLoading, isError } = useFetchPokemon(name);
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Name: {data.name}</Text>
      <Text>Weight: {data.weight}</Text>

    </View>
  );
}

export default Details;
