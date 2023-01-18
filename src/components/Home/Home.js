import React, { useContext, useEffect } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import ButtonList from "../UI/Button/ButtonList";
import SVG from "../UI/SVG/SVG";

import classes from "./Home.module.css";
import AuthContext from "../../store/auth-context";

import HooksData from "../../utils/hooks-data";

const Home = () => {
  useEffect(() => {
    const hooks = [
      "useState",
      "useEffect",
      "useReducer",
      "useContext",
      "useCallback",
      "useDebugValue",
      "useDeferredValue",
      "useId",
      "useImperativeHandle",
      "useInsertionEffect",
      "useLayoutEffect",
      "useMemo",
      "useRef",
      "useSyncExternalStore",
      "useTransition",
    ];

    HooksData.createNewList(hooks);
  }, []);

  const authCtx = useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back {authCtx.name}!</h1>
      <br />
      <h2 style={{ fontWeight: "bold" }}>Lets learn about React Hooks</h2>
      <hr />
      <ButtonList lists={HooksData.listData} />
      <hr />
      <Button
        style={{ textAlign: "center" }}
        onClick={authCtx.onLogout}
        title="Logout button"
      >
        <SVG
          viewBox="0 0 512 512"
          d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z"
        />
        <span>Logout</span>
      </Button>
    </Card>
  );
};

export default Home;
