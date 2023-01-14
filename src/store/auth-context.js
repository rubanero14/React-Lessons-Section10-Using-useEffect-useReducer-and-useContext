import React from "react";

// Initializing component or app wide initial state and store inside a variable of any name based on state context
const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;
