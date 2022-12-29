import React from "react";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import useFetchPokemon from "../hooks/useFetchPokemon";
import TypePil from "../components/TypePil";
import MovesList from "../components/MovesList";
import StatsList from "../components/StatsList";
import InfoList from "../components/InfoList";

function Details({ route }) {
  const { name } = route.params;
  const { data, isLoading, isError } = useFetchPokemon(name);
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.infoHeader}>
          <View>
            <Text style={styles.name}>{data.name}</Text>
            <View style={styles.types}>
              {data.types.map((type) => (
                <TypePil key={type.type.name} name={type.type.name} />
              ))}
            </View>
          </View>
          <Text style={styles.id}>#{data.id}</Text>
        </View>
        <Image
          style={styles.image}
          source={{ uri: data.sprites.other.home.front_default }}
        />
        <View style={styles.bottomBar} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.header1}>Details</Text>
        <InfoList data={data} />
        <Text style={styles.header1}>Stats</Text>
        <StatsList stats={data.stats} />
        <Text style={styles.header1}>Moves ({data.moves.length})</Text>
        <MovesList moves={data.moves} />
      </View>
    </ScrollView>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  imageContainer: {
    backgroundColor: "#A2D7C7",
    justifyContent: "center",
    flexDirection: "row",
    height: 230,
  },
  infoHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 80,
    marginTop: 20,
  },
  infoContainer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },

  header1: {
    fontFamily: "VT323",
    color: "black",
    fontSize: 30,
    marginBottom: 10,
  },
  id: {
    fontFamily: "VT323",
    color: "white",
    fontSize: 30,
  },
  name: {
    fontFamily: "VT323",
    color: "white",
    fontSize: 40,
    lineHeight: 30,
  },
  image: {
    width: 160,
    height: 160,
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "white",
  },
  types: {
    flexDirection: "row",
    marginTop: 5,
  },
});