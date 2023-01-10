import React, { useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import SVG from "../UI/SVG/SVG";

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
      type: "PASSWORD_INPUT",
      val: "",
    });

    dispatchLogin({
      type: "EMAIL_INPUT",
      val: "",
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
            <SVG
              viewBox="0 0 512 512"
              d="M352 96h64c17.7 0 32 14.3 32 32V384c0 17.7-14.3 32-32 32H352c-17.7 0-32 14.3-32 32s14.3 32 32 32h64c53 0 96-43 96-96V128c0-53-43-96-96-96H352c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-7.5 177.4c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22v72H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H160v72c0 9.6 5.7 18.2 14.5 22s19 2 26-4.6l144-136z"
            />
            Login
          </Button>
          &nbsp;
          <Button
            type="reset"
            className={classes.btn}
            onClick={clearFormHandler}
          >
            <SVG
              viewBox="0 0 512 512"
              d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
            />
            Reset
          </Button>
          &nbsp;
          <Button
            type="link"
            className={classes.btn}
            href="https://github.com/rubanero14/React-Lessons-Section10-Using-useEffect-useReducer-and-useContext"
          >
            <SVG
              viewBox="0 0 640 512"
              d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"
            />
            Source Code
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
