import React, { useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// State management helper function
const formReducer = (state, action) => {
  if (action.mode === "email") {
    console.log("email", action.val, action.val.includes("@"));
    if (action.type === "EMAIL_INPUT") {
      return {
        emailValue: action.val.trim(),
        isValid: action.val.includes("@"),
      };
    }

    if (action.type === "EMAIL_BLUR") {
      return {
        emailValue: state.val.trim(),
        isValid: state.val.includes("@"),
      };
    }
  }

  if (action.mode === "password") {
    console.log("email", action.val, action.val.trim().length > 6);
    if (action.type === "PASSWORD_INPUT") {
      return {
        passwordValue: action.val.trim(),
        isValid: action.val.trim().length > 6,
      };
    }

    if (action.type === "PASSWORD_BLUR") {
      return {
        passwordValue: state.val.trim(),
        isValid: state.val.trim().length > 6,
      };
    }
  }

  return {
    isValid: true,
  };
};

const Login = (props) => {
  // State management useReducers
  const [emailState, dispatchEmail] = useReducer(formReducer, {
    emailValue: "",
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(formReducer, {
    passwordValue: "",
    isValid: false,
  });

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: "EMAIL_INPUT",
      mode: "email",
      val: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "PASSWORD_INPUT",
      mode: "password",
      val: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: "EMAIL_BLUR",
    });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({
      type: "PASSWORD_BLUR",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.emailValue, passwordState.passwordValue);
  };

  const clearFormHandler = () => {
    dispatchEmail({
      val: "",
    });

    dispatchPassword({
      val: "",
    });
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            !emailState.isValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            !passwordState.isValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.passwordValue}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!(passwordState.isValid && emailState.isValid)}
          >
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
