import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import Box from '@mui/material/Box';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <Box sx={{ display: 'flex',  alignItems: 'center',  '& > *': {  m: 1,  },  }}>
      <Box sx={{ flexGrow: 1}}>
      <h1 className="ProjectName">{heading}</h1>
      <center>
      <h1 className="ProjectName">Don't forget your good ideas!</h1>
      <img src='images/completeYP.png' width='90%' height='90%'/>
      </center>
      </Box>
        <Box sx={{ flexGrow: 1}}>
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
          </Box>
      </Box>
    </div>
  );
}

export default LandingPage;
