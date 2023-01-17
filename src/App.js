import React, { useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);
  return (
    <React.Fragment>
      {
        // AuthContext.Provider is not a JSX component but a state component where we wrap the components uses the state provided by AuthContext state
        // AuthContext must have value prop and store the AuthContext state as copy to enable value changes based on user interaction
        // Since in this app we already using useState based isLoggedIn state, we can pass the value into AuthContext.Provider as dynamic instead of hardcoding it to ensure all
        // other subcomponents receives latest state that uses useState based logic
        // AuthContext.Provider basically provides the initial state to the components it wraps around
        // With that adding this state component as wrapper, we dont need <React.Fragment> as root component, hence this AuthContext can take its place
        // Since we are passing state using AuthContext value props to sub components, we dont need pass props via components anymore, and can remove the chain of props from
        // the component tree
        // Not only we can pass values of state via .Provider component, we also can pass functions as values as well (as exmaple above), in this case passing onLogout key with
        // logoutHandle function, by doing this we can remove props chaining from sub-component trees since context handles this state management directly
      }
      <MainHeader />
      <main>
        {!authCtx.isLoggedIn && <Login />}
        {authCtx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
};

export default App;
