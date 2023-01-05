import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useEffect takes 2 params, a callback function and array of dependencies. In React context, useEffect is similar to Computed and Watch method in Vue combined
  // In dependencies array, only pass the all the variable names that are used within useEffect block scope, in this context entredEmail and enteredPassword
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking input valididity...");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);

    // This is called as Clean Up (Debouncing method) function where this return wont run on the first render, but subsequent render and unmount state,
    // it will be running first and the other code above
    return () => {
      // This function will ensure the code above the return statement only runs omce, suitable for running HTTP request code based on keystroke
      console.log("Cleanup");

      // Resetting the timer of the identifier variable on every keystroke.
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]); // Dependencies acts as watcher for the variable value changes inside the dependencies array,

  // Without dependencies array, this code below will run every single time when state changes, adding dependecies will ensure only it runs once when component renders
  useEffect(() => {
    console.log("USEEFFECT running without dependency!");

    return () => {
      console.log("USE EFFECT CLEANUP running without dependency");
    };
  });

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  const clearFormHandler = () => {
    setEnteredPassword("");
    setEnteredEmail("");
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
          &nbsp;
          <Button
            type="reset"
            className={classes.btn}
            onClick={clearFormHandler}
          >
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
