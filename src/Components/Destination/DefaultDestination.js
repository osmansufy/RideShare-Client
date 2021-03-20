import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Box, Button, Container, Grid, TextField } from '@material-ui/core';
import fackData from '../../FackeData.json'
import { useParams } from 'react-router-dom';
import Map from '../Map/MapBox';



const DefaultDestination = () => {

  const [services,setServices]=useState([])
  useEffect(()=>{
    console.log(fackData);
    setServices(fackData)
  },[])

    const useStyles = makeStyles((theme)=>({
        root: {
          maxWidth: 275,
          padding:15
        },
    
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
          },
      }));
      const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

      const handleDateChange = (date) => {
        setSelectedDate(date);
      };
      const [pickupTo,setPickupTo]=useState("")
      const [pickupFrom,setPickupFrom]=useState("")
      const [showResult,setShowResult]=useState(false)
      const classes = useStyles();
      const getBustype=services?.find(service=>service.cardId===1)
      
      console.log(getBustype)
     const allTRip=[]
      
     for (let i = 0; i < 4; i++) {
       allTRip.push(  <Box
        boxShadow={1}
        bgcolor="background.paper"
   
        p={1}
        style={{
           width: '15rem',
            height: '5rem' ,
            display:"flex",
            marginTop:"10px",
            justifyContent:"space-between",
            alignItems:"center"
          }}
      >
         <img style={{    maxWidth: "50px",
    height: "50px",
    objectFit: "contain"}} src={process.env.PUBLIC_URL + getBustype?.image} alt=""/>
         <h6>{getBustype?.name}</h6>
         <i class="fa fa-user-friends"></i>4
         <span>$67</span>
         </Box>)
       
     }
     
   
     
      const destinationContainer=(
       showResult ? <CardContent >
          <div style={{
            background: "#FF6E40",
        borderRadius: "10px",
        height:"137px"
        }}>
          <div style={{
            padding:"15px",
            color:"white"
          }}>
          <h5><i style={{marginRight:"10px"}} className="fa fa-map-pin"></i>{pickupTo}</h5>
         <h5><i style={{marginRight:"10px"}} className="fa fa-map-pin"></i>{pickupFrom}</h5>
          </div>
     
          </div>
       
     {
       allTRip
     }
       </CardContent>: <CardContent>
      
       <TextField
           id="standard-full-width"
           label="Pick From"
           style={{ margin: 8 }}
           placeholder="Current"
           value={pickupTo}
           onChange={(e)=>setPickupTo(e.target.value)}
           margin="normal"
           InputLabelProps={{
             shrink: true,
           }}
         />
       <TextField
      
           label="Pick To"
           style={{ margin: 8 }}
           placeholder="Destination"
           value={pickupFrom}
           onChange={(e)=>setPickupFrom(e.target.value)}
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
        style={{width:"100%"}}
        onClick={()=>setShowResult(true)}
             >
             Search 
             </Button>
       </CardContent>
      )
    return (
        <div>
     <NavBar />
     <Container style={{margin:"40px auto"}} maxWidth="lg">
     <Grid  container >
     <Grid item xs={4}>
     <Card className={classes.root}>
     
     {destinationContainer}
     <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Travel Date"
        type="date"
        defaultValue="2017-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
        </Card>
     </Grid>
     <Grid style={{position:"relative"}} item xs={7}>
     <Map />
     </Grid>
     
     </Grid>
     
   
  
    </Container>
        </div>
    );
};

export default DefaultDestination;