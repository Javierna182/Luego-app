import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function AboutPage() {
  return (
    <main>
      <center>
      <img src='images/luego-app-logo.png' width='29%' height='29%'/>
        <h1>Don't forget your good ideas!</h1>
      </center>
      <div className="container">
        <center><h1 className="ProjectName">Where does Luego come from?</h1></center>
      <Box sx={{ display: 'flex',  alignItems: 'center',  '& > *': {  m: 1,  },  }}>
      <Box sx={{ flexGrow: 1}} >
      <Typography gutterBottom variant="h6">I like to make digital  illustrations and turn them into stickers! 
      but this is usually a long process that takes more than a day to be completed.
      </Typography>
      <Typography gutterBottom variant="h6">
      Being so busy with school work and family I want to be able to keep track of my creative projects and complete 
      the ones that are collecting dust and don't forget about the good ideas.
      </Typography>
      <Typography gutterBottom variant="h6">Luego is an app made to help creative minds who want to keep track of their projects,
       store, develop and complete their projects.
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
