import React, { useEffect, useState } from "react";

// Initializing component or app wide initial state and store inside a variable of any name based on state context
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, // for function based init state values just add an empty arrow anonymous function for better IDE auto-completion
  onLogin: (email, password) => {}, // same as above, but this time it has params as loginHandler needs params
  userName: "",
  password: "",
  name: "",
});

// Instead of applying values inside App.js using AuthContext.Provider component, we can declare here under Context Management method to create the component here
// and pass props via App.js's AuthContext component to here
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("login") === "yes") {
      setIsLoggedIn(true);
      if (localStorage.getItem("userName")) {
        setUserName(localStorage.getItem("userName"));
      }
      if (localStorage.getItem("password")) {
        setPassword(localStorage.getItem("password"));
      }
    }
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("login", "yes");
    localStorage.setItem("userName", email);
    localStorage.setItem("password", password);
    setUserName(email);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem("login", "no");
    // localStorage.removeItem("login");
    // localStorage.removeItem("userName");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (userName !== "") {
      const formattedUserName = userName
        .split("@")[0]
        .replaceAll(/[^\w|^\d]/gi, " ");

      setName(
        formattedUserName.split(" ").map((name) => {
          return (name[0].toUpperCase() + name.slice(1).toLowerCase() + " ")
            .trim()
            .toUpperCase();
        })
      );
    }
  }, [userName]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        userName: userName,
        password: password,
        name: name,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
