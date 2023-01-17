import React, { useContext } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

import classes from "./Home.module.css";
import AuthContext from "../../store/auth-context";

const Home = () => {
  const authCtx = useContext(AuthContext);

  const getUserName = () => {
    let name = "";
    if (authCtx.userName !== "") {
      const formattedUserName = authCtx.userName
        .split("@")[0]
        .replaceAll(/[^\w|^\d]/gi, " ");

      name = formattedUserName.split(" ").map((name) => {
        return (
          name[0].toUpperCase() +
          name.slice(1).toLowerCase() +
          " "
        ).trim();
      });
    }
    return name;
  };

  return (
    <Card className={classes.home}>
      <h1>Welcome back {getUserName()}!</h1>
      <br />
      <Button style={{ textAlign: "center" }} onClick={authCtx.onLogout}>
        Logout
      </Button>
    </Card>
  );
};

export default Home;
