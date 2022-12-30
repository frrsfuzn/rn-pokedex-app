import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useFetchPokemon from "../hooks/useFetchPokemon";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { AuthContext } from "../contexts/AuthContext";
import pokemonBall from "../../assets/PokemonBall.png";
import PokemonCard from "../components/PokemonCard";
import BevelButton from "../components/BevelButton";

function GetPokemon() {
  const [pokemonNumber, setPokemonNumber] = useState(null);
  const [displayResult, setDisplayResult] = useState(false);
  const [pokemonAlreadyExist, setPokemonAlreadyExist] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const { getUser } = useContext(AuthContext);
  const user = getUser();
  const { data, isLoading, isFetching } = useFetchPokemon(
    pokemonNumber,
    !!pokemonNumber
  );
  const { getItem, setItem } = useAsyncStorage("myPokemon");

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      if (isActive && pokemonAlreadyExist) {
        setPokemonNumber(null);
        setDisplayResult(false);
        setPokemonAlreadyExist(false);
        setButtonDisabled(false);
      }
      return () => {
        isActive = false;
      };
    }, [])
  );

  const savePokemon = async (pokemonName) => {
    let myPokemon = await getItem();
    if (myPokemon) {
      myPokemon = JSON.parse(myPokemon);
      const newData = { name: pokemonName };
      if (myPokemon[user.email]) {
        myPokemon[user.email].push(newData);
      } else {
        myPokemon = { ...myPokemon, [user.email]: [{ name: pokemonName }] };
      }
      const jsonValue = JSON.stringify(myPokemon);
      await setItem(jsonValue);
    } else {
      const newPokemonData = { [user.email]: [{ name: pokemonName }] };
      const jsonValue = JSON.stringify(newPokemonData);
      await setItem(jsonValue);
    }
  };

  useEffect(() => {
    if (!isLoading && !isFetching && pokemonNumber && data) {
      const timer = setTimeout(async () => {
        let myPokemon = await getItem();
        if (myPokemon) {
          myPokemon = JSON.parse(myPokemon);
          if (myPokemon[user.email]) {
            for (const pokemon of myPokemon[user.email]) {
              if (pokemon.name === data.name) {
                setPokemonAlreadyExist(true);
                break;
              }
            }
          }
        }
        rotateAnimation.stopAnimation();
        setDisplayResult(true);
        setButtonDisabled(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isLoading, isFetching, pokemonNumber, data]);

  const rotatePokemonBall = () => {
    Animated.timing(rotateAnimation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start((o) => {
      rotateAnimation.setValue(0);
      if (o.finished) {
        rotatePokemonBall();
      }
    });
  };

  const handleGetRandomPokemon = () => {
    setDisplayResult(false);
    rotatePokemonBall();
    const random = Math.floor(Math.random() * 800);
    setPokemonNumber(random);
    setButtonDisabled(true);
  };

  const handleCatchPokemon = () => {
    savePokemon(data.name);
    setPokemonNumber(null);
    setDisplayResult(false);
    setPokemonAlreadyExist(false);
    setButtonDisabled(false);
  };

  const handleReleasePokemon = () => {
    setPokemonNumber(null);
    setDisplayResult(false);
    setPokemonAlreadyExist(false);
    setButtonDisabled(false);
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "720deg"],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.resultContainer}>
          {pokemonNumber && data && displayResult ? (
            <>
              <Text style={styles.header1}>
                {pokemonAlreadyExist
                  ? "You get an existed Pokemon!"
                  : "You get a new pokemon!"}
              </Text>
              <PokemonCard pokemonName={data.name} />
            </>
          ) : (
            <Text style={styles.questionMark}>?</Text>
          )}
        </View>

        <View style={styles.catchButtonContainer}>
          {displayResult && !pokemonAlreadyExist ? (
            <>
              <Text style={styles.header1}>What are you going to do?</Text>
              <View style={styles.propmtContainer}>
                <BevelButton
                  title="Catch!"
                  containerStyle={{ flex: 1, marginRight: 20 }}
                  onPress={handleCatchPokemon}
                />
                <BevelButton
                  title="Release!"
                  containerStyle={{ flex: 1 }}
                  style={{ backgroundColor: "#EB455F" }}
                  shadowStyle={{ backgroundColor: "#962E3E" }}
                  onPress={handleReleasePokemon}
                />
              </View>
            </>
          ) : (
            <>
              <TouchableOpacity
                disabled={buttonDisabled}
                onPress={handleGetRandomPokemon}
              >
                <Animated.Image
                  source={pokemonBall}
                  style={{ width: 100, height: 100, ...animatedStyle }}
                />
              </TouchableOpacity>
              <Text style={styles.header1}>Tap to get random pokemon!</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

export default GetPokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    height: "70%",
    justifyContent: "space-between",
  },
  catchButtonContainer: {
    alignItems: "center",
  },
  resultContainer: {
    alignItems: "center",
  },
  header1: {
    fontFamily: "VT323",
    color: "black",
    fontSize: 30,
  },
  questionMark: {
    fontFamily: "VT323",
    color: "black",
    fontSize: 200,
    lineHeight: 200,
  },
  propmtContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 10,
  },
});
