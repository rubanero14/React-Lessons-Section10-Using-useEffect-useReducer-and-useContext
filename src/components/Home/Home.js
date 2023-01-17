import React, { useContext } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import ListItem from "./ListItems";

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

  const BASE_URL = "https://beta.reactjs.org/reference/react/";

  const listData = [
    {
      text: `useState()`,
      link: BASE_URL + "useState",
    },
    {
      text: `useEffect()`,
      link: BASE_URL + "useEffect",
    },
    {
      text: `useReducer()`,
      link: BASE_URL + "useReducer",
    },
    {
      text: `useContext()`,
      link: BASE_URL + "useContext",
    },
  ];

  return (
    <Card className={classes.home}>
      <h1>Welcome back {getUserName()}!</h1>
      <br />
      <h2 style={{ fontWeight: "bold" }}>Lets learn about React Hooks</h2>
      <ListItem lists={listData} />
      <Button style={{ textAlign: "center" }} onClick={authCtx.onLogout}>
        Logout
      </Button>
    </Card>
  );
};

export default Home;
