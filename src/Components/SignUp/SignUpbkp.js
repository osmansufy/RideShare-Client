import { Button, Container, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import clsx from 'clsx';


import firebase from '../../firebaseConfig';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useForm,Controller  } from "react-hook-form";
import NavBar from '../NavBar/NavBar';
import FacebookIcon from '@material-ui/icons/Facebook';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
 
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    // textField: {
    //   width: '25ch',
    // },
  }));
  const defaultValues={
      name:"",
      email:"",
      password:"",
      password_repeat:""
  }
const SignUp = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
      showPassword: false,
    });
  
  const [isSignIn,setIsSignIn]=useState(false)
  
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const { register, handleSubmit, errors, watch,control } = useForm({defaultValues});
    const [data, setData] = useState(null);

    const updateUserName=(name)=>{
        const user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name
 
}).then(function() {
console.log("user updated successfully");
}).catch(function(error) {
    console.log(error);
});

    }
    const onSubmit = async data => {
   
        console.log(data);
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        console.log(res);
        updateUserName(data.name)
        setData(data)
        setIsSignIn(true)
      })
      .catch(err => {
        console.log(err.message);

      })
      };
    
    const password = useRef({});
    password.current = watch("password", "");
    console.log(errors.password_repeat);
    return (
        <div>
            <NavBar />
            <h4>
                {data.name}
            </h4>
        <Container maxWidth="sm">

      
        <form  border={1} onSubmit={e => e.preventDefault()}>
        
            <Controller
            name="name"
            control={control}
            render={({ onChange, value }) => (
                <TextField value={value} onChange={(e) => onChange(e.target.value)} className={clsx(classes.margin, classes.textField)}  name="Name" ref={register}  label="Name" />
            )}
          />
            <Controller
            name="email"
            control={control}
            render={({ onChange, value }) => (
                <TextField value={value} onChange={(e) => onChange(e.target.value)}  className={clsx(classes.margin, classes.textField)}   name="Email" ref={register({required: true, pattern: /^\S+@\S+$/i})} label="Username/Email" />
            )}
          />
            <Controller
            name="password"
            control={control}
            render={({ onChange, value }) => (
                <>
                <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={value}
         name="OK"
              ref={register({
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters"
                }
              })}
                  onChange={onChange}
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
                {errors.password && <p>{errors.password.message}</p>}
                </>
            )}
          />
            <Controller
         name="password_repeat"
            control={control}
            render={({ onChange, value,ref }) => (
               <>
      <FormControl className={clsx(classes.margin, classes.textField)}>
      <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
      <Input   name="OK"
                value={value}
                onChange={onChange}
         type="password"
         ref={register({
           validate: value =>
             value === password.current || "The passwords do not match"
         })}
  
      />
    </FormControl>

  {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
  </>
            )}
          />
         
      
       

      
      {/* <input
        name="password"
        type="password"
        ref={register({
          required: "You must specify a password",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          }
        })}
      /> */}
    

      <Button variant="contained" size="large" type="submit" color="secondary" type="submit" onClick={handleSubmit(onSubmit)} className={classes.margin}>
         Create an account
        </Button>
      </form>
      <div className="social-container">
      <FacebookIcon color="primary" />
      </div>
      </Container>

      </div>
    );
};

export default SignUp;