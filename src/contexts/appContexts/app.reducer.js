export const reducer = (state, action) => {
  if (action.type === "SHOW_SIGNIN_PAGE") {
    if (!state.isSignedIn) {
      return {
        ...state,
        toggleSignIn: true,
        toggleRegistration: false,
        toSignIn: true,
      };
    } else if (state.isSignedIn) {
      return {
        ...state,
        toggleSignIn: false,
        toggleRegistration: false,
        toSignIn: false,
        isSignedIn: false,
      };
    }
  }

  if (action.type === "SHOW_REGISTRATION_PAGE") {
    return {
      ...state,
      toggleRegistration: true,
      toSignIn: false,
    };
  }

  if (action.type === "SIGNIN_OR_REGISTRATION") {
    return {
      ...state,
      isSignedIn: true,
      isRegistered: false,
      toSignIn: false,
    };
  }

  if (action.type === "REGISTRATION_SUCCESSFUL") {
    return {
      ...state,
      isRegistered: true,
      toggleRegistration: false,
      toSignIn: true,
    };
  }

  if (action.type === "SIGNIN_ERROR") {
    return {
      ...state,
      signInErrorMessage: action.payload,
    };
  }

  if (action.type === "SIGNIN_ERROR_UNSET") {
    return {
      ...state,
      signInErrorMessage: "",
    };
  }

  if (action.type === "REGISTRATION_ERROR_MESSAGE") {
    return {
      ...state,
      registerErrorMessage: action.payload,
    };
  }

  if (action.type === "RESTORE_STATE") {
    if (state.isSignedIn) {
      return {
        ...state,
        toSignIn: false,
        toggleSignIn: false,
        toggleRegistration: false,
        isSignedIn: false,
        isRegistered: false,
      };
    } else {
      return {
        ...state,
      };
    }
  }
};
