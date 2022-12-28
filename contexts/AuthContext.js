import React, { createContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const authReducer = (prevState, action) => {
  switch (action.type) {
    case "ON_SIGN_IN":
      return {
        ...prevState,
        error: null,
      };
    case "SIGN_IN":
      return {
        ...prevState,
        isSignout: false,
        user: action.user,
        error: null,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        isSignout: true,
        user: null,
        error: null,
      };
    case "ERROR":
      return {
        ...prevState,
        error: `Error: ${action.value}`,
      };
  }
};

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    user: null,
    error: null,
  });

  useEffect(() => {
    const definedUser = [
      { name: "Farras", email: "farras@email.com", password: "123123" },
      { name: "Anya", email: "anya@email.com", password: "321321" },
    ];
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("Users", jsonValue);
      } catch (e) {
        // saving error
        console.log("error while saving defined user", e);
      }
    };

    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("Users");
        if (!jsonValue) {
          storeData(definedUser);
        } else {
          console.log("defined user exists");
        }
      } catch (e) {
        // error reading value
        console.log("error while getting defined users", e);
      }
    };
    getData();
  }, []);

  const authContext = {
    signIn: async (email, password) => {
      console.log("signIn");

      try {
        dispatch({ type: "ON_SIGN_IN" });
        if (email === "" || password === "") {
          dispatch({
            type: "ERROR",
            value: "Email or password cannot be empty",
          });
          return;
        }
        const jsonValue = await AsyncStorage.getItem("Users");
        const users = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (users) {
          let found = false;
          users.forEach((user) => {
            if (user.email === email && user.password === password) {
              found = true;
              dispatch({ type: "SIGN_IN", user: { ...user } });
            }
          });
          if (!found) {
            dispatch({ type: "ERROR", value: "Email or password incorrect" });
          }
        }
      } catch (e) {
        console.log("error while signin", e);
      }
    },
    signOut: () => dispatch({ type: "SIGN_OUT" }),
    state,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
