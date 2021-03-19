import React from 'react';
import NavBar from '../NavBar/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button, Container, TextField } from '@material-ui/core';
import { Label } from '@material-ui/icons';
const Destination = () => {
    const useStyles = makeStyles((theme)=>({
        root: {
          maxWidth: 275,
        },
    
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
          },
      }));
      const classes = useStyles();
    return (
        <div>
     <NavBar />
     <Container maxWidth="md">

     
     <Card className={classes.root}>
      <CardContent>
      
      <TextField
          id="standard-full-width"
          label="Pick From"
          style={{ margin: 8 }}
          placeholder="Current"
   
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
      <TextField
     
          label="Pick To"
          style={{ margin: 8 }}
          placeholder="Destination"
   
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
              variant="contained"
              size="large"
              type="submit"
              color="secondary"
       
            >
            Search 
            </Button>
      </CardContent>
 
    </Card>
    </Container>
        </div>
    );
};

export default Destination;