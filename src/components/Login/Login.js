import React, { useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// State management helper function
const emailValidator = /^\S+@\S+\.\S+$/gi; // email validator regex

const initialState = {
  login: {
    email: {
      val: "",
      isValid: false,
    },
    password: {
      val: "",
      isValid: false,
    },
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL_INPUT":
      return {
        ...state,
        email: {
          val: action.val,
          isValid: emailValidator.test(action.val),
        },
      };

    case "PASSWORD_INPUT":
      return {
        ...state,
        password: {
          val: action.val.trim(),
          isValid: action.val.trim().length > 6,
        },
      };

    case "EMAIL_BLUR":
    case "PASSWORD_BLUR":
      return {
        ...state,
      };

    default:
      return initialState;
  }
};

const Login = (props) => {
  /*
    // 
      Using Destructuring to pulling out isValid properties from emailState and passwordState object and storing them into emailIsValid and passIsValid constants 
      using alias assignment, and use it as dependencies and values to useEffect below to ensure it dont fires futher if form is already valid
    //
    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;
    useEffect(() => {
      const identifier = setTimeout(() => {
        console.log("Checking input valididity...");
        setFormIsValid(emailIsValid && passwordIsValid);
      }, 500);

      // This is called as Clean Up (Debouncing method) function where this return wont run on the first render, but subsequent render and unmount state,
      // it will be running first and the other code above
      return () => {
        // This function will ensure the code above the return statement only runs omce, suitable for running HTTP request code based on keystroke
        console.log("Cleanup");

        // Resetting the timer of the identifier variable on every keystroke.
        clearTimeout(identifier);
      };
    }, [emailIsValid, passwordIsValid]);
  */

  // State management useReducers
  const [loginState, dispatchLogin] = useReducer(
    formReducer,
    initialState.login
  );

  const emailChangeHandler = (event) => {
    dispatchLogin({
      type: "EMAIL_INPUT",
      val: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchLogin({
      type: "PASSWORD_INPUT",
      val: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchLogin({
      type: "EMAIL_BLUR",
    });
  };

  const validatePasswordHandler = () => {
    dispatchLogin({
      type: "PASSWORD_BLUR",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    // Sending new user data using props function to parent component to update new list or array of users whenever add use button is clicked
    props.onLogin(loginState.email.val, loginState.password.val);
  };

  const clearFormHandler = () => {
    dispatchLogin({
      ...initialState,
    });
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            !loginState.email.isValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={loginState.email.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            !loginState.password.isValid ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={loginState.password.val}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={
              !(loginState.password.isValid && loginState.email.isValid)
            }
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
          &nbsp;
          <Button type="link" className={classes.btn} href="">
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
