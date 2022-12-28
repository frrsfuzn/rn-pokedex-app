import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PokemonLibrary from "../screens/PokemonLibrary";
import PokemonDetails from "../screens/PokemonDetails";
import GetPokemon from "../screens/GetPokemon";
import YourPokemon from "../screens/YourPokemon";

const YourPokemonStack = createNativeStackNavigator();
const PokemonLibraryStack = createNativeStackNavigator();
const GetPokemonStack = createNativeStackNavigator();

const YourPokemonStackScreens = () => (
  <YourPokemonStack.Navigator>
    <YourPokemonStack.Screen name="YourPokemon" component={YourPokemon} />
    <YourPokemonStack.Screen name="Details" component={PokemonDetails} />
  </YourPokemonStack.Navigator>
);

const PokemonLibraryStackScreens = () => (
  <PokemonLibraryStack.Navigator>
    <PokemonLibraryStack.Screen name="Home" component={PokemonLibrary} />
    <PokemonLibraryStack.Screen name="Details" component={PokemonDetails} />
  </PokemonLibraryStack.Navigator>
);

const GetPokemonStackScreens = () => (
  <GetPokemonStack.Navigator>
    <GetPokemonStack.Screen name="GetPokemon" component={GetPokemon} />
  </GetPokemonStack.Navigator>
);

const Tab = createBottomTabNavigator();

export const Main = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="YourPokemonStack"
      component={YourPokemonStackScreens}
      options={{ tabBarLabel: "Your Pokemon" }}
    />
    <Tab.Screen
      name="PokemonLibraryStack"
      component={PokemonLibraryStackScreens}
      options={{ tabBarLabel: "Pokemon Library" }}
    />
    <Tab.Screen
      name="GetPokemonStack"
      component={GetPokemonStackScreens}
      options={{ tabBarLabel: "Get Your Pokemon" }}
    />
  </Tab.Navigator>
);
