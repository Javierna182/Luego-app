import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Box from '@mui/material/Box';

function RegisterPage() {
  const history = useHistory();

  return (
    <main>
      <center>
      <img src='images/luego-app-logo.png' width='29%' height='29%'/>
      <h1>Project tracking for creative minds</h1>
      </center>
    <div className="container">
    <Box sx={{display: 'flex', alignItems: 'center', '& > *': {m: 1, },}}>
    <Box sx={{ flexGrow: 1}}>
      <center>
      <h1 className="ProjectName">Don't forget your good ideas!</h1>
      <img src='images/completeYP.png' width='90%' height='90%'/>
      </center>
      </Box>
      <Box sx={{ flexGrow: 1}} >
      <RegisterForm />
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
          >
          Login
        </button>
      </center>
      </Box>
    </Box>
    </div>
    </main>
  );
}

export default RegisterPage;
