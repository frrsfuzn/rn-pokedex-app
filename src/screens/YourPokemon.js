import React, { useCallback, useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import { useFocusEffect } from "@react-navigation/native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";
import PokemonCard from "../components/PokemonCard";

function YourPokemon({ navigation }) {
  const [myPokemon, setMyPokemon] = useState([]);
  const { getUser } = useContext(AuthContext);
  const user = getUser();
  const { getItem } = useAsyncStorage("myPokemon");

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      getItem()
        .then((res) => {
          if (isActive && res) {
            const data = JSON.parse(res);
            if (data[user.email]) {
              setMyPokemon(data[user.email]);
            }
          }
        })
        .catch((err) => console.log(err));
      return () => {
        isActive = false;
      };
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 3, backgroundColor: "white" }}>
        <Text style={styles.header1}>Latest News from Pokemon</Text>
        <WebView
          source={{
            html: '<a class="twitter-timeline" href="https://twitter.com/Pokemon?ref_src=twsrc%5Etfw">Tweets by Pokemon</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> ',
          }}
          // solution from https://github.com/react-navigation/react-navigation/issues/10290#issuecomment-1328353073
          // somehow it fixed the crash if we add custom opacity
          style={{ opacity: 0.99 }}
          scalesPageToFit={false}
        />
      </View>
      <View style={styles.pokemonListContainer}>
        <Text style={styles.header1}>Your Pokemon</Text>
        <View>
          {myPokemon.length ? (
            <ScrollView horizontal style={styles.pokemonList}>
              <View style={{ width: 10 }} />
              {myPokemon.map((pokemon) => (
                <View key={pokemon.name} style={{ marginRight: 10 }}>
                  <PokemonCard pokemonName={pokemon.name} />
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.header1}>
              You don't have any pokemon, get one!
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default YourPokemon;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
  pokemonListContainer: {
    flex: 2,
    justifyContent: "flex-start",
    marginTop: 10,
  },
  pokemonList: {
    paddingBottom: 10,
  },
  header1: {
    fontFamily: "VT323",
    color: "black",
    fontSize: 30,
    marginBottom: 10,
    textAlign: "center",
  },
  pokemon: {
    backgroundColor: "#afa",
    width: "100%",
    padding: 10,
  },
});
