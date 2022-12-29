import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPokemon = async (name) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
};

const useFetchPokemon = (name, enabled=true) =>
  useQuery({queryKey:[`pokemon-${name}`, name], queryFn: () => fetchPokemon(name), enabled});

export default useFetchPokemon;
