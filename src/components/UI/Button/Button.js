import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <React.Fragment>
      {props.type === "link" && (
        <a
          className={classes.button}
          href={props.href}
          target="_blank"
          rel="noreferrer"
          title={props.title}
        >
          {props.children}
        </a>
      )}
      {props.type !== "link" && (
        <button
          type={props.type || "button"}
          className={`${classes.button} ${props.className}`}
          onClick={props.onClick}
          disabled={props.disabled}
          title={props.title}
        >
          {props.children}
        </button>
      )}
    </React.Fragment>
  );
};

export default Button;
