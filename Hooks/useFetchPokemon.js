import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPokemon = async (name) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
};

const useFetchPokemon = (name) =>
  useQuery([`pokemon-${name}`, name], () => fetchPokemon(name));

export default useFetchPokemon;
