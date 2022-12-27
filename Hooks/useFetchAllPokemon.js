import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAllPokemon = async (offset) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
  );
  return data;
};

const useFetchAllPokemon = () =>
  useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: ({ pageParam = 0 }) => fetchAllPokemon(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.next) {
        return allPages.length * 20;
      }
      return undefined;
    },
  });

export default useFetchAllPokemon;
