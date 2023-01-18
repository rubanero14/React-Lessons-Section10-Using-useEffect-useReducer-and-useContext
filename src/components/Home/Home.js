import React, { useContext, useEffect } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import ButtonList from "../UI/Button/ButtonList";

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
        Logout
      </Button>
    </Card>
  );
};

export default Home;
