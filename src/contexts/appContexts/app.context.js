import React from "react";
import { reducer } from "./app.reducer";

import axios from "axios";
import "../../axios/axios";

// import { register, signIn } from "../../axios/axios";

const initial_state = {
  toSignIn: false,
  toggleSignIn: false,
  toggleRegistration: false,
  isSignedIn: false,
  isRegistered: false,
  signInErrorMessage: "",
  registerErrorMessage: "",
};

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initial_state);

  const showSignInPage = () => {
    dispatch({ type: "SHOW_SIGNIN_PAGE" });
  };

  const showRegistrationPage = () => {
    dispatch({ type: "SHOW_REGISTRATION_PAGE" });
  };

  const signInOrRegister = async (credentials) => {
    if (!state.toSignIn) {
      try {
        await axios.post(`/auth/register`, {
          ...credentials,
        });
        dispatch({
          type: "REGISTRATION_SUCCESSFUL",
        });
      } catch (e) {
        dispatch({
          type: "REGISTRATION_ERROR_MESSAGE",
          payload: e.response.data.message,
        });
      }
    }

    if (state.toSignIn) {
      try {
        const { data } = await axios.post(`/auth/signin`, {
          ...credentials,
        });

        if (data.status === "success") {
          localStorage.setItem(
            "user",
            JSON.stringify({ user: credentials.username, data })
          );
          dispatch({
            type: "SIGNIN_OR_REGISTRATION",
          });
        }
      } catch (e) {
        dispatch({
          type: "SIGNIN_ERROR",
          payload: e.response.data.message,
        });
      }
    }
  };

  const signInErrorUnset = () => {
    dispatch({ type: "SIGNIN_ERROR_UNSET" });
  };

  const restoreState = () => {
    dispatch({ type: "RESTORE_STATE" });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        showSignInPage,
        showRegistrationPage,
        signInOrRegister,
        signInErrorUnset,
        restoreState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return React.useContext(AppContext);
};

export { AppContext, AppProvider };
