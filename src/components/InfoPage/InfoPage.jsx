import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function InfoPage() {
  return (
    <main>
    <center>
      <img src='images/luego-app-logo.png' width='29%' height='29%'/>
        <h1>Don't forget your good ideas!</h1>
      </center>
   <div className="container">
      <Box sx={{ display: 'flex',  alignItems: 'center',  '& > *': {  m: 1,  },  }}>
      <Box sx={{ flexGrow: 1}}>
      <center>
      <p className="ProjectName">This application was developed with Prime</p> 
      <p className="ProjectName">Academy staff support and supervision.</p>
        <img src='images/prime1.png' width='20%' height='20%'/>
      </center>
      </Box>
      <Box sx={{ flexGrow: 1}} >
        <lu> Tehcnologies used:
          <li>Node</li>
          <li>Express </li>
          <li>React/ Sagas/ Redux</li>
          <li>PostgreSQL</li>
          <li>Passport</li>
          <li>Material UI</li>
          <li>AWS</li>
        </lu>
       </Box>
    </Box>
    </div>
   </main>
  );
}

export default InfoPage;
