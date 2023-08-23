import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function AboutPage() {
  return (
    <main>
      <center>
      <img src='images/luego-app-logo.png' width='29%' height='29%'/>
        <h1>Project tracking for creative minds</h1>
      </center>
      <div className="container">
        <center><h1 className="ProjectName">Learn more about Luego</h1></center>
      <Box sx={{ display: 'flex',  alignItems: 'center',  '& > *': {  m: 1,  },  }}>
      <Box sx={{ flexGrow: 1}} >
      <Typography gutterBottom variant="h6">I like to make digital illustrations and turn them into stickers! 
      Creating stickers is usually a long process that takes more than a day to complete.
      </Typography>
      <Typography gutterBottom variant="h6">
      With being busy with school, work, and family, I wanted to be able to keep track of my creative projects in progress, complete 
      the ones that are collecting dust, and not forget new ideas as they come to me.
      </Typography>
      <Typography gutterBottom variant="h6">Luego is an app made to help creative minds track,
       store, develop and complete projects.
      </Typography>
      <Typography gutterBottom variant="h6">The objective of this application is to 
      help log ongoing creative ideas in a single, organized space. Additionally, this will help keep track of the status 
      of projects and final work.
      </Typography>
      </Box>
      <Box sx={{ flexGrow: 1}}>
      <center>
      <img className="fotoS" src='images/stickers.png' width='70%' height='70%'/>
      </center>
      </Box>
    </Box>
    </div>
   </main>
  );
}

export default AboutPage;
