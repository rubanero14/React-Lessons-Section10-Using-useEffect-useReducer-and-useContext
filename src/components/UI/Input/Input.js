import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={`${styles.control} ${props.isValid ? styles.invalid : ""}`}>
      <label htmlFor={props.inputType}>{props.label}</label>
      <input
        type={props.inputType}
        id={props.inputType}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.validator && <p>{props.validatorMessage}</p>}
    </div>
  );
};

export default Input;
