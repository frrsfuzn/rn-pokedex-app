import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useFetchPokemon from "../hooks/useFetchPokemon";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";
import pokemonBall from "../../assets/PokemonBall.png";
import PokemonCard from "../components/PokemonCard";

function GetPokemon() {
  const [pokemonNumber, setPokemonNumber] = useState(null);
  const { getUser } = useContext(AuthContext);
  const user = getUser();
  const { data, isLoading } = useFetchPokemon(pokemonNumber, !!pokemonNumber);
  const { getItem, setItem } = useAsyncStorage("myPokemon");
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
  useEffect(() => {
    const savePokemon = async (pokemonName) => {
      let myPokemon = await getItem();
      if (myPokemon) {
        myPokemon = JSON.parse(myPokemon);
        const newData = { name: pokemonName };
        if (myPokemon[user.email]) {
          myPokemon[user.email].push(newData);
        } else {
          myPokemon = { ...myPokemon, [user.email]: [{ name: pokemonName }] };
        }
        const jsonValue = JSON.stringify(myPokemon);
        await setItem(jsonValue);
      } else {
        const newPokemonData = { [user.email]: [{ name: pokemonName }] };
        const jsonValue = JSON.stringify(newPokemonData);
        await setItem(jsonValue);
      }
    };
    if (!isLoading && pokemonNumber && user) {
      savePokemon(data.name);
    }
  }, [isLoading, pokemonNumber]);
  const handleGetRandomPokemon = () => {
    const random = Math.floor(Math.random() * 800);
    setPokemonNumber(random);
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.resultContainer}>
          {pokemonNumber ? (
            isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <View>
                <Text>You get a pokemon!</Text>
                <PokemonCard pokemonName={data.name} />
              </View>
            )
          ) : (
            <Text style={styles.questionMark}>?</Text>
          )}
        </View>
        <View style={styles.catchButtonContainer}>
          <TouchableOpacity onPress={handleGetRandomPokemon}>
            <Image source={pokemonBall} style={{ width: 100, height: 100 }} />
          </TouchableOpacity>
          <Text style={styles.header1}>Tap to get random pokemon!</Text>
        </View>
      </View>
    </View>
  );
}

export default GetPokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    // backgroundColor: "salmon",
    height: "80%",
    justifyContent: "space-between",
  },
  catchButtonContainer: {
    alignItems: "center",
  },
  resultContainer: {
    alignItems: "center",
  },
  header1:{
    fontFamily: "VT323",
    color: "black",
    fontSize: 30,
  },
  questionMark: {
    fontFamily: "VT323",
    color: "black",
    fontSize: 200,
    lineHeight: 200
  }
});
