# React-Lessons-Section10-Using-useEffect-useReducer-and-useContext

```
OK, I found this lesson on useReducer hard to follow (not hard to understand but hard to follow, do this here, scroll up change this, scroll down, change that trying to follow the explanation of what is going on). So I took to pen and paper and I have the following notes in case it might help someone else.

useReducer

What does it do? Simplifies handling complex states / related states.

Syntax: const [state,dispatch] = useReducer(reducer, initial state)

So, in your Login () function you want a line ..

  const [state, dispatch] = useReducer(reducer, initialState)


What is the "initial state"?  For email and password we want value = '' and isValid= false, so I create an object before the Login() ..



const initialState = {
  email: {
    value: '',
    isValid: false
  },
  password: {
    value: '',
    isValid: false
  }
}


What is "reducer"? This is a function what takes two parameters (state, action) and returns a new state (updated).

We all know what "state" is, but what is "action"? "action" is a description you give to something you want to be handled. In this provided app, we have inputs for email and password and validations for both so we want to handle the following actions:

"eminput" - email input. When a user changes the email input field we want to perform this action to update the state (create a new state) that is the same as the previous state with the email value being whatever was input and the validation check being that the email must contain "@".

"emblur" - when the email field loses focus.

"pwinput" - password input. When a user changes the password input field we want to perform this action to update the state (create a new state) that is the same as the previous state with the password value being whatever was input and the validation check being that the password must be more than 6 characters.

"pwblur" - when the password field loses focus.



So, before Login() I create the reducer function as explained above ..



const reducer = (state, action) => {
  let newState
  switch (action.type) {
    case 'eminput':
      newState = { ...state, email: { value: action.value, isValid: action.value.includes('@') } }
      break
    case 'emblur':
      newState = { ...state }
      break
    case 'pwinput':
      newState = { ...state, password: { value: action.value, isValid: action.value.trim().length > 6 } }
      break
    case 'pwblur':
      newState = { ...state }
      break
    default:
      return initialState
  }
  return newState
}


Now, I can remove the states for enteredEmail, emailIsValid, enteredPassword and passwordIsValid as these are all taken care of in the new initialState and in the Reducer.



So, where/how to call these actions that the reducer handles? Good question. Where/how are these handled now?

Changing email input - onChange = {emailChangeHandler}

Email lost focus - onBlur = {validateEmailHandler}

Changing password input - onChange = {passwordChangeHandler}

Password lost focus - onBlur = {validatePasswordHandler}

ok thats where these "actions" are being handled now, and how they are being handled, by using onChange or onBlur on input lines.  But now, with reducer we use Dispatch. Dispatch sends an "action"  to the reducer function using an object with {type='Name of Action' and value = 'the piece of information this action will add to the state').

We could keep the same onChange and onBlur as above, and just change the called functions as follows:



const emailChangeHandler = e => {
    dispatch({ type: 'eminput', value: e.target.value })
  }

const passwordChangeHandler = e => {
  dispatch({ type: 'pwinput', value: e.target.value })
}

const validateEmailHandler = () => {
  dispatch({ type: 'emblur' })
}

const validatePasswordHandler = () => {
  dispatch({ type: 'pwblur' })
}


Then in returned JSX code, use state.email.isValid and state.password.isValid for classes lines and state.email.value and state.password.value for input lines. (Use same values in submitHandler).

(Probably could have just one validate handler and one "blur" in reducer since both are just replacing state with previous state!)

In the lessons it gives different reducers and states for email and password but as explained in the lesson, you can just have one reducer. One works for me.

I personally find it easier to think about what you are trying to achieve in these lessons, write it down, plan it out and then watch the video. I think useReducer is a lot easier than shown.

```
