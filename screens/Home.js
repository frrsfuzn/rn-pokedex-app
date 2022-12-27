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
  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useFetchAllPokemon();
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

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return (
    <View style={styles.container}>
      <Text>Pokedex App</Text>
      <FlatList
        data={data?.pages.map((page) => page.results).flat()}
        renderItem={pokemonItem}
        keyExtractor={(result) => result.name}
        style={styles.pokemonList}
        onEndReached={loadMore}
      />
      {isLoading ? <Text>Loading...</Text> : null}
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
