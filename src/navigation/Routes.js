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

import yourPokemonIcon from "../../assets/YourPokemon.png";
import pokemonLibraryIcon from "../../assets/PokemonLibrary.png";
import getPokemonIcon from "../../assets/GetPokemonIcon.png";
import profileIcon from "../../assets/ProfileIcon.png";
import { Image } from "react-native";

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
      options={{ headerTitle: "Your Pokemon", headerShown: false }}
      component={YourPokemon}
    />
    <YourPokemonStack.Screen
      name="Details"
      options={{
        headerTitle: "Details",
        headerTitleAlign: "center",
        headerTitleStyle: { fontFamily: "VT323", fontSize: 30 },
      }}
      component={PokemonDetails}
    />
  </YourPokemonStack.Navigator>
);

const PokemonLibraryStackScreens = () => (
  <PokemonLibraryStack.Navigator>
    <PokemonLibraryStack.Screen
      name="PokemonLibrary"
      options={{
        headerTitle: "Pokemon Library",
        headerTitleAlign: "center",
        headerTitleStyle: { fontFamily: "VT323", fontSize: 30 },
      }}
      component={PokemonLibrary}
    />
    <PokemonLibraryStack.Screen
      name="Details"
      options={{
        headerTitle: "Details",
        headerTitleAlign: "center",
        headerTitleStyle: { fontFamily: "VT323", fontSize: 30 },
      }}
      component={PokemonDetails}
    />
  </PokemonLibraryStack.Navigator>
);

const GetPokemonStackScreens = () => (
  <GetPokemonStack.Navigator>
    <GetPokemonStack.Screen
      name="GetPokemon"
      options={{
        headerTitle: "Get Pokemon",
        headerTitleAlign: "center",
        headerTitleStyle: { fontFamily: "VT323", fontSize: 30 },
      }}
      component={GetPokemon}
    />

    <GetPokemonStack.Screen
      options={{
        headerTitle: "Details",
        headerTitleAlign: "center",
        headerTitleStyle: { fontFamily: "VT323", fontSize: 30 },
      }}
      name="Details"
      component={PokemonDetails}
    />
  </GetPokemonStack.Navigator>
);

const ProfileStackScreens = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      options={{
        headerTitleAlign: "center",
        headerTitleStyle: { fontFamily: "VT323", fontSize: 30 },
      }}
      component={Profile}
    />
  </ProfileStack.Navigator>
);

const MainStackScreens = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { backgroundColor: "#5C87AE" },
    }}
  >
    <Tab.Screen
      name="YourPokemonStack"
      component={YourPokemonStackScreens}
      options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Image
              source={yourPokemonIcon}
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                bottom: focused ? 30 : 20,
              }}
            />
          );
        },
      }}
    />
    <Tab.Screen
      name="PokemonLibraryStack"
      component={PokemonLibraryStackScreens}
      options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Image
              source={pokemonLibraryIcon}
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                bottom: focused ? 30 : 20,
              }}
            />
          );
        },
      }}
    />
    <Tab.Screen
      name="GetPokemonStack"
      component={GetPokemonStackScreens}
      options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Image
              source={getPokemonIcon}
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                bottom: focused ? 30 : 20,
              }}
            />
          );
        },
      }}
    />
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStackScreens}
      options={{
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Image
              source={profileIcon}
              style={{
                width: 40,
                height: 40,
                position: "absolute",
                bottom: focused ? 30 : 20,
              }}
            />
          );
        },
      }}
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
