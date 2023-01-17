import React from "react";

import Button from "../UI/Button/Button";

import styles from "./ListItem.module.css";

const ListItem = (props) => {
  return (
    <ul className={styles.listItems}>
      {props.lists.map((list) => (
        <li>
          <h3>
            Learn about &nbsp;
            <Button type="link" href={list.link}>
              <code>{list.text}</code>
            </Button>
            &nbsp; Hook!
          </h3>
        </li>
      ))}
    </ul>
  );
};

export default ListItem;
