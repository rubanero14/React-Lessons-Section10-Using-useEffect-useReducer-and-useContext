import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";

import AuthContext from "./store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("login") === "yes") {
      setIsLoggedIn(true);
      setUserName(localStorage.getItem("userName"));
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("login", "yes");
    localStorage.setItem("userName", email);
    setUserName(email);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
      }}
    >
      {
        // AuthContext.Provider is not a JSX component but a state component where we wrap the components uses the state provided by AuthContext state
        // AuthContext must have value prop and store the AuthContext state as copy to enable value changes based on user interaction
        // Since in this app we already using useState based isLoggedIn state, we can pass the value into AuthContext.Provider as dynamic instead of hardcoding it to ensure all
        // other subcomponents receives latest state that uses useState based logic
        // AuthContext.Provider basically provides the initial state to the components it wraps around
        // With that adding this state component as wrapper, we dont need <React.Fragment> as root component, hence this AuthContext can take its place
        // Since we are passing state using AuthContext value props to sub components, we dont need pass props via components anymore, and can remove the chain of props from
        // the component tree
      }
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} userName={userName} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
