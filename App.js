import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const fetchPokemon = async () => {
  const res = await axios("https://pokeapi.co/api/v2/pokemon");
  console.log(res);
  return res.data;
};

const Home = () => {
  const { data, isLoading } = useQuery(["pokemon"], fetchPokemon);
  return (
    <View style={styles.container}>
      <Text>Pokedex App</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        data.results.map((result) => (
          <Text key={result.name}>{result.name}</Text>
        ))
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
