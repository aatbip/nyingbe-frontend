import React from "react";
import { AppContext } from "../../contexts/appContexts/app.context";

import "./style.signIn.css";

import Confetti from "react-confetti";

export const SignIn = () => {
  const {
    toggleRegistration,
    showRegistrationPage,
    signInOrRegister,
    isRegistered,
    signInErrorMessage,
    registerErrorMessage,
    signInErrorUnset,
  } = React.useContext(AppContext);

  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
  });

  const [show, setShow] = React.useState(true);

  const reactionMessages = () => {
    if (show)
      if (isRegistered) {
        return <p className="signin-msg"> Registration Successful! </p>;
      } else if (!isRegistered) {
        return <p className="signin-msg">{registerErrorMessage}</p>;
      }
  };

  const handleChange = (event) => {
    setCredentials((prevValue) => {
      return {
        ...prevValue,
        [event.target.name]: event.target.value,
      };
    });
  };

  React.useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [show]);

  React.useEffect(() => {
    const timeId = setTimeout(() => {
      signInErrorUnset();
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  });

  const toggleShow = () => {
    setShow(true);
  };

  return (
    <div className="signIn">
      {isRegistered && (
        <Confetti className="confetti" width={300} height={300} />
      )}
      {reactionMessages()}
      {signInErrorMessage && <p className="signin-msg">{signInErrorMessage}</p>}
      <form className="signIn-form">
        <input
          id="input-1"
          type="text"
          name="username"
          placeholder="enter username"
          onChange={(e) => handleChange(e)}
        />
        <input
          id="input-2"
          type="password"
          name="password"
          placeholder="enter password"
          onChange={(e) => handleChange(e)}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            signInOrRegister(credentials);
            toggleShow();
          }}
        >
          {toggleRegistration ? "Register" : "SignIn"}
        </button>
      </form>
      <p className="signIn-text">
        Don't have an account?
        <b
          className="register"
          onClick={() => {
            showRegistrationPage();
            toggleShow();
          }}
        >
          Register
        </b>
      </p>
    </div>
  );
};
