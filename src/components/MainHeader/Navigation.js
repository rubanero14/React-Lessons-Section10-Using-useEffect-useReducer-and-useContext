import React, { useContext } from "react";
import SVG from "../UI/SVG/SVG";

import classes from "./Navigation.module.css";

import AuthContext from "../../store/auth-context";

const Navigation = (props) => {
  const ctx = useContext(AuthContext);
  return (
    // <AuthContext.Consumer>
    //   {
    //     // One way to listen to AuthContext state is using .Consumer component method appended to AuthContext component
    //     // This will be as complex way of implementing AuthContext listener on the sub-components which needs its state
    //     // AuthContext.Consumer is not a JSX component but a state component where we wrap the components receives the state provided by AuthContext state
    //     // AuthContext.Consumer basically receives/listens to the initial state from AuthContext.Provider component to the components it wraps around
    //     // With that adding this state component as wrapper, we dont need <React.Fragment> as root component, hence this AuthContext can take its place
    //     // Auth.Consumer basically takes a child with arrow function, where the arguement will be context data which defined in AuthContext component and the
    //     // function returns the JSX codes of the wrapped components
    //     // now instead of props, we can replace it with ctx to access its state
    //   }
    //   {(ctx) => {
    //     return (
    //       <nav className={classes.nav}>
    //         <ul>
    //           {ctx.isLoggedIn && (
    //             <li>
    //               <a href="/">Users</a>
    //             </li>
    //           )}
    //           {ctx.isLoggedIn && (
    //             <li>
    //               <a href="/">Admin</a>
    //             </li>
    //           )}
    //           {ctx.isLoggedIn && (
    //             <li>
    //               <button onClick={props.onLogout}>
    //                 <SVG
    //                   viewBox="0 0 512 512"
    //                   d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
    //                 />
    //                 Logout
    //               </button>
    //             </li>
    //           )}
    //         </ul>
    //       </nav>
    //     );
    //   }}
    // </AuthContext.Consumer>
    <nav className={classes.nav}>
      {
        // Another way of listening to AuthContext state is using useContext hook/method
        // This will be the simplest way of implementing AuthContext listener on the sub-components which needs its state
      }
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>
              <SVG
                viewBox="0 0 512 512"
                d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
              />
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
