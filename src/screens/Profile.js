import { View, Text, Button, StyleSheet } from "react-native";
import React, { useContext, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContext";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import BevelButton from "../components/BevelButton";

const ProfileItem = ({ label, value }) => {
  return (
    <View style={styles.profileItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const Profile = () => {
  const { state, signOut } = useContext(AuthContext);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const { getItem } = useAsyncStorage("myPokemon");
  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      getItem()
        .then((res) => {
          if (isActive && res) {
            const data = JSON.parse(res);
            if (data[state.user.email]) {
              setTotalPokemon(data[state.user.email].length);
            }
          }
        })
        .catch((err) => console.log(err));
      return () => {
        isActive = false;
      };
    }, [])
  );
  return (
    <View style={styles.container}>
      <Text style={styles.header1}>Hi, {state.user.name}!</Text>
      <Text style={styles.header1}>Here's your profile</Text>
      <View style={{ height: 10 }} />
      <ProfileItem label="Name" value={state.user.name} />
      <ProfileItem label="Email" value={state.user.email} />
      <ProfileItem label="Total Pokemon" value={totalPokemon} />
      <BevelButton
        title="Sign Out"
        onPress={signOut}
        style={{ backgroundColor: "#EB455F" }}
        shadowStyle={{ backgroundColor: "#962E3E" }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text>Made with ❤️ </Text>
        <Text>by Mochamad Farras Fauzan</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 30,
    flex: 1,
  },
  header1: {
    fontFamily: "VT323",
    color: "black",
    fontSize: 30,
    lineHeight: 30,
  },
  profileItem: {
    backgroundColor: "#181D31",
    padding: 17,
    borderRadius: 10,
    marginBottom: 15,
  },

  label: {
    fontFamily: "VT323",
    color: "#678983",
    fontSize: 20,
    lineHeight: 20,
  },
  value: {
    fontFamily: "VT323",
    color: "#F0E9D2",
    fontSize: 30,
  },
});
