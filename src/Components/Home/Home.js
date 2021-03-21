import React, { useEffect, useState } from 'react';
import bgImage from '../../assets/images/Bg.png'

import { Box, Container, Grid } from '@material-ui/core';
import NavBar from '../NavBar/NavBar';
import fackData from '../../FackeData.json'
import { useHistory } from 'react-router';
const Home = () => {
    const [services,setServices]=useState([])
    useEffect(()=>{
        console.log(fackData);
        setServices(fackData)
    },[])
    const history=useHistory()
    const onChouseRide=(type)=>{
        history.push(`/ride/${type}`)
    }
    return (
        <div style={{backgroundImage:`url(${bgImage})`,
        padding:"50px",
        backgroundPosition:"center",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover"
    
    }
        }>
            <NavBar />
<Container style={{padding:"10% 0 15% 0"}} maxWidth="md">
<Grid container spacing={3}>
    {services.map(data=>(
           <Grid key={data.cardId} item xs={12} md={3}>
           <div onClick={()=>onChouseRide(data.name)} className="image-wrapper">
                               <img src={process.env.PUBLIC_URL +data.image} alt=""/>
                               
                               <h5>{data.name}</h5>
                           </div>
               </Grid>
    )
     
    )}

           </Grid>
           </Container> 
        </div>
    );
};

export default Home;