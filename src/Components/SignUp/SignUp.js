import React, { useContext, useRef, useState } from "react";
import NavBar from "../NavBar/NavBar";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@material-ui/core";
import clsx from "clsx";

import firebase from "../../firebaseConfig";
import { makeStyles } from "@material-ui/core/styles";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { SignInContext, UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },

  withoutLabel: {
    marginTop: theme.spacing(3),
  },

}));

const SignUp = () => {
    const history = useHistory();
const location = useLocation();
const { from } = location.state || { from: { pathname: "/" } };
const is_valid_email = (email) => /(.+)@(.+){2,}\.(.+){2,}/.test(email);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isSignIn, setIsSignIn] = useContext(SignInContext);
  const classes = useStyles();
  const [user, setUser] = useState({
    newAccount: true,
    name: "",
    email: "",
    password: "",
    newUser: false,
  });
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (e) => {
    const newUserInfo = {
      ...user,
    };
    //debugger;
    // perform validation
    let isValid = true;
    if (e.target.name === "email") {
      isValid = is_valid_email(e.target.value);
    }
    if (e.target.name === "password") {
      isValid = e.target.value.length > 8;
    }

    newUserInfo[e.target.name] = e.target.value;
    newUserInfo.isValid = isValid;
    setUser(newUserInfo);
  };
  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("user updated successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onSubmit = () => {
    console.log(user);
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        console.log(res);
        updateUserName(user.name);
        setLoggedInUser({name:res.user.displayName})
        setIsSignIn(true);
        history.replace(from);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const signUphandle = () => {
    console.log(user);
    setUser({ ...user, newAccount: !user.newAccount });
  };
  const provider = new firebase.auth.GoogleAuthProvider();
  const googleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const userInfo = result.user;
        const createdUser = { ...user };
        createdUser.isSignedIn = true;
        createdUser.name = userInfo.displayName;
        createdUser.email = userInfo.email;
        setLoggedInUser({name:userInfo.displayName})
        setUser(createdUser);
        setIsSignIn(true)
        history.replace(from);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage, email);
      });
  };

  const signInUser = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        console.log(res);
        const createdUser = { ...user };
        createdUser.isSignedIn = true;
        const userInfo = res.user;
        setLoggedInUser({name:userInfo.displayName})
        createdUser.error = "";
        createdUser.name = userInfo.displayName;
        setUser(createdUser);
        setIsSignIn(true);
        history.replace(from);
      })
      .catch((err) => {
        console.log(err.message);
        const createdUser = { ...user };
        createdUser.isSignedIn = false;
        createdUser.error = err.message;
        setUser(createdUser);
      });
  };
  console.log(user);
  return (
    <div>
      <NavBar />
      {/* {user.isSignedIn && (
        <div>
          <p> Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
        </div>
      )} */}
      <Container maxWidth="sm">
        {user?.newAccount ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              value={user.name}
              onChange={handleChange}
              className={clsx(classes.margin, classes.textField)}
              name="name"
              label="Name"
            />
            <TextField
              value={user.email}
              onChange={handleChange}
              className={clsx(classes.margin, classes.textField)}
              name="email"
              label="Username/Email"
            />
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                name="password"
                type={values.showPassword ? "text" : "password"}
                value={user.password}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              variant="contained"
              size="large"
              type="submit"
              color="secondary"
              type="submit"
              onClick={onSubmit}
              className={classes.margin}
            >
              Create an account
            </Button>
          </form>
        ) : (
          <>
            <form onSubmit={(e) => e.preventDefault()}>
              <TextField
                value={user.email}
                onChange={handleChange}
                className={clsx(classes.margin, classes.textField)}
                name="email"
                label="Username/Email"
              />
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  name="password"
                  type={values.showPassword ? "text" : "password"}
                  value={user.password}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                variant="contained"
                size="large"
                type="submit"
                color="secondary"
                type="submit"
                onClick={signInUser}
                className={classes.margin}
              >
                Login
              </Button>
            </form>
          </>
        )}
        <h4>
          {!user?.newAccount ? (
            <div style={{ display: "flex" }}>
              <span>Do you have an account</span>
              <a onClick={signUphandle}>Create Account</a>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <span>Already have an account</span>
              <a onClick={signUphandle}>Login</a>
            </div>
          )}
        </h4>
        <Button onClick={googleSignIn}>Google</Button>
      </Container>
    </div>
  );
};

export default SignUp;
