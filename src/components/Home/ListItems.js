import React from "react";

import Button from "../UI/Button/Button";

import styles from "./ListItem.module.css";

const ListItem = (props) => {
  return (
    <ul className={styles.listItems}>
      {props.lists.map((list) => (
        <li key={list.text}>
          <Button type="link" href={list.link}>
            <code>{list.text}</code>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ListItem;
