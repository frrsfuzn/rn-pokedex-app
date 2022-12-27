import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const fetchAllPokemon = async () => {
	const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon');
	return data;
};

const useFetchAllPokemon = () => useQuery(['pokemon'], fetchAllPokemon);

export default useFetchAllPokemon;
