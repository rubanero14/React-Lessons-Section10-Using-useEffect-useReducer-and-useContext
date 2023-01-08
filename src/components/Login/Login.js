import React, { useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  // State management helper function
  const emailValidator = /^\S+@\S+\.\S+$/gi; // email validator regex

  const formReducer = (state, action) => {
    if (action.mode === "email") {
      if (action.type === "EMAIL_INPUT") {
        return {
          emailValue: action.val,
          isValid: emailValidator.test(action.val),
        };
      }

      if (action.type === "EMAIL_BLUR") {
        return {
          emailValue: state.val.trim(),
          isValid: emailValidator.test(state.val.trim()),
        };
      }
    }

    if (action.mode === "password" && emailValidator.test(action.val)) {
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
            value={emailState.isValid ? emailState.emailValue : null}
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
