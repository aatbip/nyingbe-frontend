//importing libraries
import React from "react";

//importing contexts
import { AppContext } from "./contexts/appContexts/app.context";

// importing components
import { Navbar } from "./components/Navbar/Navbar";
import { SignIn } from "./components/SignIn/SignIn";
import { Body } from "./pages/Body";
import { UserDashboard } from "./pages/UserDashboard";

export const App = () => {
  const { toggleSignIn, isSignedIn } = React.useContext(AppContext);
  return (
    <main>
      <Navbar />
      {isSignedIn ? <UserDashboard /> : toggleSignIn ? <SignIn /> : <Body />}
    </main>
  );
};
