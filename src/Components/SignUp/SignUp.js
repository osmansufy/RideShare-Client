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
    confirmPassword: "",
    newUser: false,
    error: "",
  });
  const [values, setValues] = React.useState({
    showPassword: false,
    confirmPassword: false,
  });

  const handleClickShowPassword = (change) => {
    if (change == "password") {
      setValues({ ...values, showPassword: !values.showPassword });
    } else if (change == "confirmPassword") {
      setValues({ ...values, confirmPassword: !values.confirmPassword });
    }
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
    let formError = "";
    if (e.target.name === "email") {
      isValid = is_valid_email(e.target.value);
      if (!isValid) {
        formError = "Email Should be valid";
      } else {
        formError = "";
      }
    }
    if (e.target.name === "password") {
      isValid = e.target.value.length > 6;
      if (!isValid) {
        formError = "Password Should be more than  6 characters";
      } else {
        formError = "";
      }
    }
    if (e.target.name === "confirmPassword") {
      isValid = e.target.value === user.password;
      console.log(e.target.value, user.password, isValid);
      if (!isValid) {
        formError = "Password Should be match with confirm password";
      } else {
        formError = "";
      }
    }

    newUserInfo[e.target.name] = e.target.value;
    newUserInfo.isValid = isValid;
    newUserInfo.error = formError;
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
    if (user.isValid) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          console.log(res);
          updateUserName(user.name);
          setLoggedInUser({ name: user.name });
          setIsSignIn(true);
          history.replace(from);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
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
        setLoggedInUser({ name: userInfo.displayName });
        setUser(createdUser);
        setIsSignIn(true);
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
        setLoggedInUser({ name: userInfo.displayName });
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
        <div className="signUp">
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
                        onClick={() => handleClickShowPassword("password")}
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
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">
                  Confirm Password
                </InputLabel>
                <Input
                  name="confirmPassword"
                  type={values.confirmPassword ? "text" : "password"}
                  value={user.confirmPassword}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() =>
                          handleClickShowPassword("confirmPassword")
                        }
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.confirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              {user.error ? (
                <p style={{ color: "red", fontWeight: "bold" }}>{user.error}</p>
              ) : (
                ""
              )}
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
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                >
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
                          onClick={() => handleClickShowPassword("password")}
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
          <h4 style={{ textAlign: "center" }}>
            {!user?.newAccount ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span>Do you have an account?</span>
                <a onClick={signUphandle} style={{ color: "#FF6E40" }}>
                  Create Account
                </a>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span>Already have an account?</span>
                <a onClick={signUphandle} style={{ color: "#FF6E40" }}>
                  Login
                </a>
              </div>
            )}
          </h4>
        </div>
        <Button
          variant="outlined"
          color="light"
          onClick={googleSignIn}
          style={{ display: "flex", margin: "10px auto" }}
          startIcon={<i style={{ color: "red" }} className="fa fa-google"></i>}
        >
          Continue with google account
        </Button>
      </Container>
    </div>
  );
};

export default SignUp;
