import React from "react";
import useFetchAllPokemon from "../hooks/useFetchAllPokemon";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PokemonCard from "../components/PokemonCard";

function Home({ navigation }) {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchAllPokemon();
  const pokemonItem = ({ item }) => {
    return (
      // <TouchableOpacity
      //   onPress={() => navigation.push("Details", { name: item.name })}
      //   key={item.name}
      //   style={styles.pokemon}
      // >
      //   <Text>{item.name}</Text>
      // </TouchableOpacity>
      <PokemonCard pokemon={item}/>
    );
  };

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.pages.map((page) => page.results).flat()}
        renderItem={pokemonItem}
        columnWrapperStyle={{justifyContent: 'space-evenly'}}
        keyExtractor={(result) => result.name}
        style={styles.pokemonList}
        onEndReached={loadMore}
        ListFooterComponent={
          isFetchingNextPage ? <Text>Loading...</Text> : null
        }
        numColumns={2}
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
