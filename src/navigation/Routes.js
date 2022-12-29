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
import LoadingSplash from "../screens/LoadingSplash";
import Profile from "../screens/Profile";

const YourPokemonStack = createNativeStackNavigator();
const PokemonLibraryStack = createNativeStackNavigator();
const GetPokemonStack = createNativeStackNavigator();
const AuthenticationStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const YourPokemonStackScreens = () => (
  <YourPokemonStack.Navigator>
    <YourPokemonStack.Screen
      name="YourPokemon"
      options={{ headerTitle: "Your Pokemon" }}
      component={YourPokemon}
    />
    <YourPokemonStack.Screen
      name="Details"
      options={{ headerTitle: "Details" }}
      component={PokemonDetails}
    />
  </YourPokemonStack.Navigator>
);

const PokemonLibraryStackScreens = () => (
  <PokemonLibraryStack.Navigator>
    <PokemonLibraryStack.Screen
      name="PokemonLibrary"
      options={{ headerTitle: "Pokemon Library" }}
      component={PokemonLibrary}
    />
    <PokemonLibraryStack.Screen name="Details" component={PokemonDetails} />
  </PokemonLibraryStack.Navigator>
);

const GetPokemonStackScreens = () => (
  <GetPokemonStack.Navigator>
    <GetPokemonStack.Screen name="GetPokemon" component={GetPokemon} />
    <GetPokemonStack.Screen name="Details" component={PokemonDetails} />
  </GetPokemonStack.Navigator>
);

const ProfileStackScreens = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
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
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStackScreens}
      options={{ tabBarLabel: "Profile" }}
    />
  </Tab.Navigator>
);

const AuthenticationStackScreens = () => (
  <AuthenticationStack.Navigator>
    <AuthenticationStack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <AuthenticationStack.Screen name="Register" component={Register} />
  </AuthenticationStack.Navigator>
);

export const Routes = () => {
  const { state } = useContext(AuthContext);
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {state.isLoading ? (
        <AppStack.Screen name="LoadingSplash" component={LoadingSplash} />
      ) : state.user !== null ? (
        <AppStack.Screen name="MainScreens" component={MainStackScreens} />
      ) : (
        <AppStack.Screen
          name="AuthenticationScreens"
          component={AuthenticationStackScreens}
          options={{
            animationTypeForReplace: state.isSignout ? "pop" : "push",
          }}
        />
      )}
    </AppStack.Navigator>
  );
};
