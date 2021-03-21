import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid } from "@material-ui/core";
import { SignInContext, UserContext } from "../../App";
import Usermanu from "../Profile/UserManu";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    "& li": {
      margin: "10px",
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [isSignIn, setIsSignIn] = useContext(SignInContext);
  return (
      <Container maxWidth="lg">
    <Grid container>
        <Grid item md={6} xs={12}>
<h2><Link to="/"> Ride Share </Link></h2>
        </Grid>
        <Grid item md={6} xs={12} >
    <div className={classes.root}>
        
      <ul className={classes.navItem}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/ride">Destination</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          {isSignIn ? (
            <Usermanu userName={loggedInUser.name} />
          ) : (
            <Link to="/signup">
              {" "}
              <Button variant="contained" color="secondary">
                Login
              </Button>{" "}
            </Link>
          )}
        </li>
      </ul>
    </div>
    </Grid>
    </Grid>
    </Container>
  );
};

export default NavBar;
