import React from "react";

import Button from "./Button";

import styles from "./ButtonList.module.css";

const ButtonList = ({ lists, title }) => {
  const finalList = [title, ...lists];
  return (
    <ul className={styles.buttonList}>
      {finalList.map((list) => {
        return typeof list === "string" ? (
          <>
            <hr />
            <h3>{title}</h3>
          </>
        ) : (
          title === list.title && (
            <li key={list.id} id={list.id}>
              {console.log(title === list.title)}
              <Button
                type="link"
                href={list.href}
                title={"Link to official doc on learning " + list.btnContent}
              >
                <code>{list.btnContent}</code>
              </Button>
            </li>
          )
        );
      })}
    </ul>
  );
};

export default ButtonList;
