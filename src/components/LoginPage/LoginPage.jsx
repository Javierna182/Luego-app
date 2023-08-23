import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';

function LoginPage() {
  const history = useHistory();

  return (
    <main>
       <center>
      <img src='images/luego-app-logo.png' width='29%' height='29%'/>
      <h1>Project tracking for creative minds</h1>
      </center>
      <div className="container">
      <Box sx={{ display: 'flex',  alignItems: 'center',  '& > *': {  m: 1,  },  }}>
      <Box sx={{ flexGrow: 1}}>
      <center>
      <h1 className="ProjectName">Don't forget your good ideas!</h1>
      <img src='images/completeYP.png' width='90%' height='90%'/>
      </center>
      </Box>
      <Box sx={{ flexGrow: 1}} >
      <LoginForm />
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
          >
          Register
        </button>
      </center>
    </Box>
    </Box>
   </div>
   </main>
  );
}

export default LoginPage;
