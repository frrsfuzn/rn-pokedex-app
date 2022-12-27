import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

const fetchPokemon = async () => {
  const res = await axios("https://pokeapi.co/api/v2/pokemon");
  console.log(res);
  return res.data;
};

const Home = ({ navigation }) => {
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
      <Button
        title="Go to details"
        onPress={() => navigation.navigate("Details")}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const Details = ({navigation}) => {
  return (
    <View>
      <Text>Details</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()}/>
    </View>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
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
