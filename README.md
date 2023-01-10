# React-Lessons-Section10-Using-useEffect-useReducer-and-useContext


## useReducer

What does it do? Simplifies handling complex states / related states.

Example: 
```
const [state, dispatch] = useReducer(reducer, initial state);
```

So, in your Login () function you want a line.
```
const [loginState, dispatchLogin] = useReducer(formReducer, initialState.login);
```


What is the "initial state"?  For email and password we want value = '' and isValid= false, so I created an object before the Login() ..
```
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
```

What is "reducer"? This is a function what takes two parameters (state, action) and returns a new state (updated).

We all know what "state" is, but what is "action"? "action" is a description you give to something you want to be handled. In this provided app, we have inputs for email and password and validations for both so we want to handle the following actions:

"EMAIL_INPUT" - email input. When a user changes the email input field we want to perform this action to update the state (create a new state) that is the same as the previous state with the email value being whatever was input and the validation check being that the email must contain "@".

"EMAIL_BLUR" - when the email field loses focus.

"PASSWORD_INPUT" - password input. When a user changes the password input field we want to perform this action to update the state (create a new state) that is the same as the previous state with the password value being whatever was input and the validation check being that the password must be more than 6 characters.

"PASSWORD_BLUR" - when the password field loses focus.

So, before Login() I createD the reducer function as explained above.

```
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
```

Now, I can remove the states for enteredEmail, emailIsValid, enteredPassword and passwordIsValid as these are all taken care of in the new initialState and in the Reducer.

So, where/how to call these actions that the reducer handles? Good question. Where/how are these handled now?

Changing email input - <code>onChange = {emailChangeHandler}</code>

Email lost focus - onBlur = <code>{validateEmailHandler}</code>

Changing password input - onChange = <code>{passwordChangeHandler}</code>

Password lost focus - onBlur = <code>{validatePasswordHandler}</code>

ok thats where these "actions" are being handled now, and how they are being handled, by using onChange or onBlur on input lines.  But now, with reducer we use dispatch function. Dispatch function sends an "action"  to the reducer function using an object with {type='name-of-action' and value = 'new-data-to-be-added-to-state').

We could keep the same onChange and onBlur as above, and just change the called functions as follows:

```
const emailChangeHandler = e => {
  dispatch({type: 'EMAIL_INPUT', value: e.target.value});
}

const passwordChangeHandler = e => {
  dispatch({type: 'PASSWORD_INPUT', value: e.target.value});
}

const validateEmailHandler = () => {
  dispatch({type: 'EMAIL_BLUR'});
}

const validatePasswordHandler = () => {
  dispatch({type: 'PASSWORD_BLUR'});
}
```

Then in returned JSX code, use state.email.isValid and state.password.isValid for classes lines and state.email.value and state.password.value for input lines. (Use same values in submitHandler).

(Probably could have just one validate handler and one "blur" in reducer since both are just replacing state with previous state!)

In the lessons it gives different reducers and states for email and password but as explained in the lesson, you can just have one reducer.
