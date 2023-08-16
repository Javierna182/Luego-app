import './projectDetails.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

function ProjectDetails() {

    const {id} = useParams();// use to grab the id from the url 
    const projects = useSelector(store => store.projects);// use to select from the projects DB
    const project = projects.find(project => project.id == id);// filters the projects so we get the project that we want

    const images = useSelector(store => store.images);// use to select from the images DB
    const [isMasked, setIsMasked] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "FETCH_IMAGES", payload: id});
    }, []);
    
    // useEffect(() => {
    //     dispatch({ type: "FETCH_PROJECTS", payload: project});
    // }, []);
    
    const goToHome = () => {
        history.push(`/home`)
    }

    const goToEdit = () => {
      history.push(`/editProject/${project.id}`)
    }

    // toggles if we show the name or not
    const toggleMask = () => {
      console.log('clicked a button');
      // set state
      setIsMasked(!isMasked)

  }
    
    function srcset(image, width, height, rows = 1, cols = 1) {
      return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${
          height * rows
        }&fit=crop&auto=format&dpr=2 2x`,
      };
    }

    if (project === undefined){
      return null;
    }
    return (
      <main>
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
        <button className="btn" type="submit" onClick={goToHome}>Go To Home</button>

                <Box key={project.id} sx={{ flexGrow: 1,width: '100%', maxWidth: 860  }}>
                  <Grid container spacing={2}>
                    <Grid item xs={5} >
                      <h1>{project.title}</h1>
                      <Divider variant="middle" />
                      <Typography gutterBottom variant="h6">{project.comments}</Typography>
                      <Typography gutterBottom variant="h7">{ !project.status ? <p>Status: Uncomplete</p> : <p>Status: Complete</p> }</Typography>
                      {/* <Typography  gutterBottom variant="h7">
                        { !isMasked && <p>Link: {project.coverImage}</p>}
                      </Typography> */}
                      {/* <img src={project.coverImage} alt={project.title}/> */}
                        <Stack sx={{margin:5}} direction="row" spacing={2}>
                          <button className="btnEdit" onClick={goToEdit}>Edit</button>
                          {/* <button className="btn">Uncomplete</button> */}
                          <button className="btnShare" onClick={toggleMask}>Share</button>
                          {/* <button className="btnDelete ">Delete</button> */}
                        </Stack>  
                      <Typography  gutterBottom variant="h7">
                        { !isMasked && <p>Link: {project.coverImage}</p>}
                      </Typography>
                      </Grid>
                  <Grid item xs={4}>
                    <ImageList
                      sx={{
                        width: 500,
                        height: 450,
                        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                        transform: 'translateZ(0)',
                      }}
                      rowHeight={200}
                      gap={1}
                     >
                      {
                        images.map((imagesToDisplay) =>{
                          const cols = imagesToDisplay.featured ? 2 : 1;
                          const rows = imagesToDisplay.featured ? 2 : 1;

                          return(
                            <ImageListItem key={imagesToDisplay.url} cols={cols} rows={rows}>
                              <img {...srcset(imagesToDisplay.url, 250, 200, rows, cols)} alt={imagesToDisplay.name} loading="lazy"/>
                              <ImageListItemBar
                                  sx={{
                                    background:
                                      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                  }}
                                  title={imagesToDisplay.name}
                                  position="top"
                                  actionIcon={
                                    <IconButton
                                      sx={{ color: 'white' }}
                                      aria-label={`star ${imagesToDisplay.name}`}
                                    >
                                      <StarBorderIcon />
                                    </IconButton>
                                  }
                                  actionPosition="left"
                                />
                              </ImageListItem>
                          );
                        })}
                        </ImageList>
                </Grid>
                  </Grid>
                </Box>
               
            {/* <input type="text" placeholder="New Name"/>
            <textarea placeholder="Comments" name="description"/> */}
            {/* <img src={} alt={} /> */}    
            <div>
            </div>
        </Box>
      </main>
    );
  }

  // this allows us to use <App /> in index.js
  export default ProjectDetails;

  //////


// function ProjectDetails() {

//   const {id} = useParams();// use to grab the id from the url 
//   const projects = useSelector(store => store.projects);// use to select from the projects DB
//   const project = projects.find(project => project.id == id);// filters the projects so we get the project that we want

//   const images = useSelector(store => store.images);// use to select from the images DB

//   const history = useHistory();
//   const dispatch = useDispatch();

//   useEffect(() => {
//       dispatch({ type: "FETCH_IMAGES", payload: id});
//   }, []);
  
//   // useEffect(() => {
//   //     dispatch({ type: "FETCH_PROJECTS", payload: project});
//   // }, []);
  
//   const goToHome = () => {
//       history.push(`/home`)
//   }

//   const goToEdit = () => {
//     history.push(`/editProject/${project.id}`)
//   }

//   if (project === undefined){
//     return null;
//   }
//   return (
//     <main>
//       <div className="container" >
//       <button className="btn" type="submit" onClick={goToHome}>Go To Home</button>

      
//       <section className="project">
          
//               <div key={project.id}>
//                   <h3>{project.title}</h3>
//                   <h4>{project.comments}</h4>
//                   <h4>Status:{project.status}</h4>
//                   <h4>{project.share}</h4>
//                   <img src={project.coverImage} alt={project.title}/>
//                   <ul>
//                     {
//                       images.map(imagesToDisplay => <div key={imagesToDisplay.url}>
//                         <li>
//                         <img src={imagesToDisplay.url} alt={imagesToDisplay.name}/>
//                         </li>
//                       </div>)
//                     }
//                   </ul>
//                   <button className="btn" onClick={goToEdit}>Edit</button>
//               </div>
             
//           {/* <input type="text" placeholder="New Name"/>
//           <textarea placeholder="Comments" name="description"/> */}
//           {/* <img src={} alt={} /> */}    
//           <button>Uncomplete</button>
//           <button>Share</button>
//           <button>Delete</button>
//       </section>
//       </div>
//     </main>
//   );
// }

// // this allows us to use <App /> in index.js
// export default ProjectDetails;
