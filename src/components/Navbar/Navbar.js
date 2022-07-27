import React from "react";
import "./style.navbar.css";

//importing contexts
import { AppContext } from "../../contexts/appContexts/app.context";
import { UserDashboardContext } from "../../contexts/userDashboardContexts/userDashboard.context";
export const Navbar = () => {
  const { showSignInPage, isSignedIn, restoreState } = React.useContext(AppContext);
  const { handleSignOut } = React.useContext(UserDashboardContext);
  let user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="navbar">
      <h2>{isSignedIn ? `HELLO, ${user.user}` : "NG"}</h2>
      <button
        type="button"
        className="btn-signin"
        onClick={() => {
          showSignInPage();
          handleSignOut();
          restoreState(); 
        }}
      >
        {isSignedIn ? "Sign Out" : "Sign In"}
      </button>
    </div>
  );
};
