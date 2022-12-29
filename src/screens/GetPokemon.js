import React, { useState, useCallback, useEffect, useContext } from "react";
import { Button, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useFetchPokemon from "../hooks/useFetchPokemon";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";

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
