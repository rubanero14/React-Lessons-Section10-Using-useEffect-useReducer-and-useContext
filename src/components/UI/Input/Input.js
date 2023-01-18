import React, { useRef, useImperativeHandle } from "react";

import styles from "./Input.module.css";

// A React component not only receives props, but also ref, when we passing refs, it is imperative to wrap the component with React.forwardRef() to forward the referencing to parent component's ref to work
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const focusInput = () => {
    // .focus() is vanilla JS method to auto-focus the input upon rendered on DOM
    // .current is is React syntax to point current element that being referenced
    inputRef.current.focus();
  };

  // This useImperativeHandle() hook used for passing forwardRefs from parent component to child component without using props, but programmatically
  // Accepts 2 arguements, first is ref and second is a function that returns an object with connecting parent child refs
  // Although this hook is useful for focusing on input programmatically, exposing functions or variables to parent component, its best practice to strongly avoid using this hook
  useImperativeHandle(ref, () => {
    return {
      focusInput: focusInput,
    };
  });

  return (
    <div className={`${styles.control} ${props.isValid ? styles.invalid : ""}`}>
      <label htmlFor={props.inputType}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.inputType}
        id={props.inputType}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.validator && <p>{props.validatorMessage}</p>}
    </div>
  );
});

export default Input;
