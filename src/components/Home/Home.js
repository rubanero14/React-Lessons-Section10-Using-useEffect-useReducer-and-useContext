import React from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";

import classes from "./Home.module.css";

const Home = (props) => {
  const formattedUserName = props.userName
    .split("@")[0]
    .replaceAll(/[^\w|^\d]/gi, " ");

  const name = formattedUserName.split(" ").map((name) => {
    return name[0].toUpperCase() + name.slice(1).toLowerCase() + " ";
  });

  return (
    <Card className={classes.home}>
      <h1>Welcome back {name}!</h1>
      <br />
      <Button style={{ textAlign: "center" }} onClick={props.onLogout}>
        Logout
      </Button>
    </Card>
  );
};

export default Home;
