import React from "react";

import Button from "./Button";

import styles from "./ButtonList.module.css";

const ButtonList = (props) => {
  return (
    <ul className={styles.buttonList}>
      {props.lists.map((list) => (
        <li key={list.id} id={list.id}>
          <Button type="link" href={list.href}>
            <code>{list.btnContent}</code>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default ButtonList;
