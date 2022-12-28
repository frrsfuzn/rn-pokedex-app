import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Details from "../screens/Details";
import GetPokemon from "../screens/GetPokemon";

const HomeStack = createNativeStackNavigator();
const GetPokemonStack = createNativeStackNavigator();

const HomeStackScreens = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Details" component={Details} />
  </HomeStack.Navigator>
);

const GetPokemonStackScreens = () => (
  <GetPokemonStack.Navigator>
    <GetPokemonStack.Screen name="GetPokemon" component={GetPokemon} />
  </GetPokemonStack.Navigator>
);

const Tab = createBottomTabNavigator();

export const Main = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="HomeStack" component={HomeStackScreens} options={{tabBarLabel: "Home"}} />
    <Tab.Screen name="GetPokemonStack" component={GetPokemonStackScreens} options={{tabBarLabel: "Get Your Pokemon"}} />
  </Tab.Navigator>
);
