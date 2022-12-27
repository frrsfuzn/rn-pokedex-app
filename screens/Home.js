import React from "react";
import useFetchAllPokemon from "../Hooks/useFetchAllPokemon";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function Home({ navigation }) {
  const { data, isLoading, isError } = useFetchAllPokemon();
  const pokemonItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { name: item.name })}
        key={item.name}
        style={styles.pokemon}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <Text>Pokedex App</Text>
      <FlatList
        data={data.results}
        renderItem={pokemonItem}
        keyExtractor={(result) => result.name}
        style={styles.pokemonList}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonList: {
    width: "100%",
  },
  pokemon: {
    backgroundColor: "#afa",
    width: "100%",
    padding: 10,
  },
});
