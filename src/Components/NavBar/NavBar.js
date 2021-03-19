import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { SignInContext, UserContext } from '../../App';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor:"transparent",
        display:"flex",
        justifyContent:"flex-end"
    },
    navItem: {
        display:"flex",
       '& li':{
            margin:"10px"
        }
    },
  }));
  
const NavBar = () => {
    const classes=useStyles()
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isSignIn, setIsSignIn] = useContext(SignInContext);
    return (
        <div className={classes.root}>
            <ul className={classes.navItem}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/ride">Destination</Link></li>
                <li><Link to="/">Home</Link></li>
                <li>
                    <Link to="/signup">

                        {
                            isSignIn ? <span>{loggedInUser.name}</span>:
                            <Button variant="contained" color="secondary">
  Login
</Button>
                        }
                    
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;