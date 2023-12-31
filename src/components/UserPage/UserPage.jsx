import './userPage.css';
import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';



function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const projects = useSelector(store => store.projects);
  const history = useHistory();
  const [isMasked, setIsMasked] = useState(true);
  const [statusFilter, setStatusFilter] = useState(null);

let filteredProjects = projects; 
if (statusFilter !== null){
  filteredProjects = projects.filter((project) => project.status === statusFilter)
}

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECTS'});
  }, []);

    const goToNewProject = () => {
        history.push(`/addproject`)
    }

    const goToProjectDetails = (id) => {
      history.push(`/ProjectDetails/${id}`)
  }
  const [spacing, setSpacing] = React.useState(0);

  // toggles if we show the link or not
  const toggleMask = () => {
    console.log('clicked a button');
    // set state
    setIsMasked(!isMasked)

}

  return (
    <main>
      <center>
        <button className="btnAddNew" onClick={() => goToNewProject()}>ADD NEW +</button>
        <h1>Don't forget your good ideas!</h1>
      </center>
      <div className="container">
      <Box
      sx={{
        display: 'flex',
        paddingBottom: {xs:'5px', md:0},
        paddingTop: {xs:'5px', md:0},
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
          <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={() => setStatusFilter(null)}>All</Button>
            <Button onClick={() => setStatusFilter(false)}>Uncomplete</Button>
            <Button onClick={() => setStatusFilter(true)}>Complete</Button>
          </ButtonGroup> 
        <Grid sx={{ flexGrow: 1 }} container spacing={1}  margin={1}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-around" spacing={spacing} >
            {filteredProjects.map(project => {
                return(
                  <Card sx={{ maxWidth: 250, minWidth:250, backgroundColor:'#eeeeee', marginTop:'15px'}} key={project.id} >
                  <CardMedia
                    component="img"
                    alt= {project.title}
                    height="140"
                    image= {`/api/aws/${project.coverImage}`}
                  />
                  <CardContent>
                    <center>
                    <Typography gutterBottom variant="h5" component="div" >
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.comments}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{paddingTop:'15px'}}>
                    { !project.status ? <Chip label='Status: Uncomplete' sx={{backgroundColor:'orange', color:'white'}} /> 
                    : <Chip label='Status: Complete' color="success" />}
                    </Typography>
                    </center>
                  </CardContent>
                  <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                          m: 1,
                        },
                      }}
                    >
                    <button size="small"
                     className="btn" onClick={() => goToProjectDetails(project.id)}
                     >Details</button>
                  <CardActions>
                    {/* <button size="small" className="btn" onClick={toggleMask}>Share</button> */}
                  </CardActions>
                  {/* { !isMasked && <Chip label={project.coverImage} color="success" />} */}
                  </Box>
                </Card>
                );
          })}
          </Grid>
          </Grid>
          </Grid>
    {/* <h2>Welcome, {user.username}!</h2>
    <p>Your ID is: {user.id}</p>
    <LogOutButton className="btn" /> */}
    </Box>
    </div>
    </main>
  );
}


// this allows us to use <App /> in index.js
export default UserPage;


// function UserPage() {
//   // this component doesn't do much to start, just renders some user reducer info to the DOM
//   const user = useSelector((store) => store.user);
//   const [userProjects, setUserProjects] = useState([]);

//   const history = useHistory();

//     const goToNewProject = () => {
//         history.push(`/newproject`)//change the id to ${id} once the database is working
//     }

//     const goToProjectDetails = (id) => {
//       history.push(`/ProjectDetails/:id`)//change the id to ${id} once the database is working
//   }

//   useEffect(() => {
//     fetchUserProjects();
//   }, []);

//   const fetchUserProjects =  () => {
//     fetch('/api/projects').then(response => {
//       if(response.ok){
//         return response.json();
//       } else{
//         throw new Error("Request not OK");
//       }
//     }).then(userProjectsFromServer => {
//       setUserProjects(userProjectsFromServer);
//     }).catch(error => {
//       console.log(error);
//       alert('Something went wrong');
//     })
//   }

//   return (
//     <main>
//       <div className="container">
//       <button className="btn" type="submit" onClick={() => goToNewProject()}>Add New +</button>
//         <h2>Don't forget your good ideas!</h2>
//           <button>All</button>
//           <button>Uncomplete</button>
//           <button>Complete</button>
//         <section className="projects">
//             {userProjects.map(project => {
//                 return(
//                 <div key={project.id}>
//                     <h3>{project.title}</h3>
//                     <h4>{project.comments}</h4>
//                     <h4>{project.status}</h4>
//                     <h4>{project.share}</h4>
//                     <img src={project.coverImage} alt={project.title}/>
//                 </div>
//                 );
//           })}
//       </section>
//     <h2>Welcome, {user.username}!</h2>
//     <p>Your ID is: {user.id}</p>
//     <button className="btn" type="submit" onClick={() => goToProjectDetails()}>Details</button>
//     <LogOutButton className="btn" />
//     </div>
//     </main>
//   );
// }