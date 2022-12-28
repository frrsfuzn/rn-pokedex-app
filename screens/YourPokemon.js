import React, { useCallback, useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native";
import { WebView } from "react-native-webview";
import { useFocusEffect } from "@react-navigation/native";
import {useAsyncStorage} from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

function YourPokemon({ navigation }) {
  const [myPokemon, setMyPokemon] = useState([]);
  const {signOut, state, getUser} = useContext(AuthContext);
  const user = getUser();
  const {getItem} = useAsyncStorage("myPokemon")

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      getItem()
      .then(res => {
        if(isActive && res){
          const data = JSON.parse(res)
          setMyPokemon(data[user.email])
        }
      })
      .catch(err => console.log(err))
      return () => {
        isActive = false;
      };
    }, [])
  );
  const pokemonItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.push("Details", { name: item.name })}
        key={item.name}
        style={styles.pokemon}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 200, backgroundColor: "white" }}>
        <Text>Hi, {state.user.name}!</Text>
        <Text>Pokemon's Twitter</Text>
        <WebView
          source={{
            html: '<a class="twitter-timeline" href="https://twitter.com/Pokemon?ref_src=twsrc%5Etfw">Tweets by Pokemon</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> ',
          }}
          // solution from https://github.com/react-navigation/react-navigation/issues/10290#issuecomment-1328353073
          // somehow it fixed the crash if we add custom opacity
          style={{ opacity: 0.99 }}
        />
      </View>
      <View>
        <Text>Your Pokemon</Text>
        <FlatList
          data={myPokemon}
          renderItem={pokemonItem}
          keyExtractor={(result) => result.name}
          style={styles.pokemonList}
        />
      </View>
    </SafeAreaView>
  );
}

export default YourPokemon;

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
