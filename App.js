import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider from "./contexts/AuthContext";

import { useFonts } from "expo-font";
import { Routes } from "./navigation/Routes";

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    "VT323": require("./assets/fonts/VT323-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <React.Fragment>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </NavigationContainer>
      </AuthContextProvider>
    </React.Fragment>
  );
}
