import React, { useState, useCallback, useEffect } from "react";
import { Button, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useFetchPokemon from "../hooks/useFetchPokemon";
import AsyncStorage from '@react-native-async-storage/async-storage'; 

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
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('myPokemon')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e) {
        console.log('error get data', e)
      }
    }
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('myPokemon', jsonValue)
      } catch (e) {
        console.log('error save data', e)
      }
    }
    const savePokemon = async (pokemonName) => {
      const myPokemon = await getData()
      if(myPokemon){
        const newData = {name: pokemonName}
        myPokemon.push(newData)
        await storeData(myPokemon)
      }else{
        const newPokemonData = [{name: pokemonName}]
        await storeData(newPokemonData)        
      }
    }
    if(!isLoading && pokemonNumber){
      savePokemon(data.name)
    }
  }, [isLoading, pokemonNumber])
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
