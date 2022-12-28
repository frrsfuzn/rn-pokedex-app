import React, { createContext, useReducer, useEffect } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const authReducer = (prevState, action) => {
  switch (action.type) {
    case "RESTORE_USER":
      return {
        ...prevState,
        isLoading: false,
        user: action.user,
      };
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
    case "SIGN_UP":
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
  const { getItem, setItem } = useAsyncStorage("Users");
  const {
    getItem: getLoggedUser,
    setItem: setLoggedUser,
    removeItem: removeLoggedUser,
  } = useAsyncStorage("LoggedUser");

  useEffect(() => {
    const definedUser = [
      { name: "Farras", email: "farras@email.com", password: "123123" },
      { name: "Anya", email: "anya@email.com", password: "321321" },
    ];

    const saveDefinedUsers = async () => {
      const jsonValue = await getItem();
      if (!jsonValue) {
        const data = JSON.stringify(definedUser);
        await setItem(data);
      }
    };

    const checkLoggedUser = async () => {
      const loggedUser = await getLoggedUser();
      if (loggedUser) {
        const user = JSON.parse(loggedUser);
        dispatch({ type: "RESTORE_USER", user });
      }
    };
    saveDefinedUsers();
    checkLoggedUser();
  }, []);

  const authContext = {
    signIn: async (email, password) => {
      try {
        dispatch({ type: "ON_SIGN_IN" });
        if (email === "" || password === "") {
          dispatch({
            type: "ERROR",
            value: "Email or password cannot be empty",
          });
          return;
        }
        const jsonValue = await getItem();
        const users = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (users) {
          let found = false;
          users.forEach((user) => {
            if (user.email === email && user.password === password) {
              found = true;
              const loggedUser = JSON.stringify(user);
              setLoggedUser(loggedUser).then(() => {
                dispatch({ type: "SIGN_IN", user: { ...user } });
              });
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
    signUp: async (name, email, password) => {
      try {
        dispatch({ type: "ON_SIGN_IN" });
        if (name === "" || email === "" || password === "") {
          dispatch({
            type: "ERROR",
            value: "Name, email or password cannot be empty",
          });
          return;
        }
        const jsonValue = await getItem();
        const users = jsonValue != null ? JSON.parse(jsonValue) : [];
        if (users) {
          let emailExist = false;
          users.forEach((user) => {
            if (user.email === email) {
              emailExist = true;
              dispatch({
                type: "ERROR",
                value: "Email already used, use another email!",
              });
            }
          });
          if (!emailExist) {
            const user = { name, email, password };
            const loggedUser = JSON.stringify(user);
            await setLoggedUser(loggedUser);
            users.push(user);
            const jsonValue = JSON.stringify(users);
            await setItem(jsonValue);
            dispatch({ type: "SIGN_UP", user: { ...user } });
          }
        }
      } catch (e) {
        console.log("error while signup", e);
      }
    },
    signOut: async () => {
      await removeLoggedUser();
      dispatch({ type: "SIGN_OUT" });
    },
    getUser: () => state.user,
    state,
  };
  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
