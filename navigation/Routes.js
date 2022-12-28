import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

import PokemonLibrary from "../screens/PokemonLibrary";
import PokemonDetails from "../screens/PokemonDetails";
import GetPokemon from "../screens/GetPokemon";
import YourPokemon from "../screens/YourPokemon";
import Login from "../screens/Login";
import Register from "../screens/Register";

const YourPokemonStack = createNativeStackNavigator();
const PokemonLibraryStack = createNativeStackNavigator();
const GetPokemonStack = createNativeStackNavigator();
const AuthenticationStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

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

const MainStackScreens = () => (
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

const AuthenticationStackScreens = () => (
  <AuthenticationStack.Navigator>
    <AuthenticationStack.Screen name="Login" component={Login} />
    <AuthenticationStack.Screen name="Register" component={Register} />
  </AuthenticationStack.Navigator>
);

const isLogin = false;

export const Routes = () => {
  const {state} = useContext(AuthContext)
  console.log(state)
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {state.user !== null ? (
        <AppStack.Screen name="MainScreens" component={MainStackScreens} />
      ) : (
        <AppStack.Screen
          name="AuthenticationScreens"
          component={AuthenticationStackScreens}
          options={{
            animationTypeForReplace: state.isSignout ? 'pop' : 'push',
          }}
        />
      )}
    </AppStack.Navigator>
  );
};
