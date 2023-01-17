import React, { useContext } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import ButtonList from "../UI/Button/ButtonList";

import classes from "./Home.module.css";
import AuthContext from "../../store/auth-context";

import HooksData from "../../utils/hooks-data";

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back {authCtx.name}!</h1>
      <br />
      <h2 style={{ fontWeight: "bold" }}>Lets learn about React Hooks</h2>

      <ButtonList lists={HooksData.listData} />

      <Button style={{ textAlign: "center" }} onClick={authCtx.onLogout}>
        Logout
      </Button>
    </Card>
  );
};

export default Home;
