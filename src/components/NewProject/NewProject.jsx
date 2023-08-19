import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { readAndCompressImage } from 'browser-image-resizer';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Warning } from '@mui/icons-material';


function NewProject() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [comments, setComments] = useState('');
    const [share, setShare] = useState('');
    const [status, setStatus] = useState(false);
    const [coverImage, setCoverImage] = useState('');
    const [carouselImage, setCarouselImage] = useState('');
    const { id } = useParams();// used to get the project id to edit   

    // Selected image file name
    const [fileName, setFileName] = useState('');
    // Selected file type
    const [fileType, setFileType] = useState('');
    // Selected image file
    const [selectedFile, setSelectedFile] = useState();
    // Selected image preview
    const [imagePreview, setImagePreview] = useState();
    // Used to display uploaded images on the page
    const [imageList, setImageList] = useState([]);
    
    const onFileChange = async (event) => {
      // Access the selected file
      const fileToUpload = event.target.files[0];
  
      // Resize and compress the image. Remove this if using something other
      // than an image upload.
      const copyFile = new Blob([fileToUpload], { type: fileToUpload.type, name: fileToUpload.name });
      const resizedFile = await readAndCompressImage(copyFile, {
        quality: 1.0,    // 100% quality
        maxHeight: 1000, // max height of the image
      });

    // Limit to specific file types.
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    // Check if the file is one of the allowed types.
    if (acceptedImageTypes.includes(fileToUpload.type)) {
      // Resizing the image removes the name, store it in a separate variable
      setFileName(encodeURIComponent(fileToUpload.name));
      setFileType(encodeURIComponent(fileToUpload.type));
      // Save the resized file
      setSelectedFile(resizedFile);
      // Create a URL that can be used in an img tag for previewing the image
      setImagePreview(URL.createObjectURL(resizedFile));
    } else {
      alert('Please select an image');
    }
  }

    useEffect(() => {
      if (id) {
        fetch(`/api/projects/${id}`)
          .then(response => response.json())
          .then(project => {
            console.log('here:', project);
            setTitle(project.title);
            setComments(project.comments);
            setShare(project.share);
            setStatus(project.status);
            setCoverImage(project.coverImage);
        }).catch(error => {
            console.log(error);
            alert('something went wrong!');
          })
      }
    }, [id]);

    // useEffect(() => {
    //   if (id) {
    //     fetch(`/api/images/${id}`)
    //       .then(response => response.json())
    //       .then(image => {
    //         console.log('here:', image);
    //         setCarouselImage(image.url);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         alert('something went wrong!');
    //       })
    //   }
    // }, [id]);
    
    const goToHome = () => {
        history.push(`/home`)
    }

    const goToEdit = () => {
      history.push(`/editProject/${project.id}`)
    }

    const addProject = (event) => {
      event.preventDefault();
      if (id) {
        dispatch({ type: 'EDIT_PROJECT', payload:{ title, comments, share, status, coverImage, id }, history})
        goToHome();
      }else{
        let imageList = [{data: selectedFile, fileName, fileType}];
        dispatch({ type: 'ADD_PROJECT', payload: {title, comments, share, status, coverImage}, imageList, history});
        // dispatch({ type: 'ADD_IMAGE', payload: {carouselImage}, history});
        console.log( {title, comments, share, status, coverImage})
        setTitle('');
        setComments('');
        setShare('');
        setStatus('');
        setCoverImage('');
        // setCarouselImage('');
        goToHome();
        setFileName();
        setFileType();
      }
    };

    // const addImage = (event) => {
    //   event.preventDefault();
    //   if (id) {
    //     dispatch({ type: 'EDIT_IMAGE', payload:{ carouselImage, id }, history})

    //   }else{
    //     dispatch({ type: 'ADD_IMAGE', payload: {carouselImage}, history});
    //     console.log( {carouselImage})
    //     setCarouselImage('');
    //   }
    // };
    

    const delteProject = () =>{
      let result = confirm('Are you sure?');
      if(result == true){
        dispatch({type: 'DELETE_PROJECT', payload:id})
        goToHome();
      }
    }

    const toggleStatus = () => {
      setStatus(!status)
    }

    return (
      <main>
        <div>
      <form onSubmit={addProject}>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />
        {
          imagePreview && (
            <>
              <br />
              <br />
              <p>Preview</p>
              <img style={{maxHeight: '100px'}} src={imagePreview} />
            </>
          )
        }
        <br />
        {/* <button type="submit">Submit</button> */}
      </form>

      <h2>Images</h2>
      {
        imageList.map(image => (
          <div key={image.id}>
            <div>{image.name}</div>
            <div>{image.type}</div>
            <img style={{ maxHeight: '200px' }} src={`api/images/${image.name}`} /> 
          </div>
        ))
      }
    </div>
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
        
        <h1>{id ? 'Edit Project' : 'New Project'}</h1>  
        <button className="btn" type="submit" onClick={goToHome}>Go To Home</button>

        <Box sx={{ flexGrow: 1,width: '100%', maxWidth: 860  }}>
          <Grid container spacing={2}>
            <Grid item xs={5} >
            <TextField 
              id="filled-multiline-static"
              label="Project Name"
              multiline
              maxRows={4}
              variant="standard"
              value={title} type="text" placeholder="New Name" onChange={(event) => {
                // console.log(event)
                setTitle(event.target.value)
              }}
            />
            <h1></h1>
            {/* <p>Name:<input value={title} type="text" placeholder="New Name" onChange={(event) => {
              // console.log(event)
              setTitle(event.target.value)
            }}/></p> */}
            {/* <Divider variant="middle" /> */}
            <TextField
              id="filled-multiline-static"
              label="Comments"
              multiline
              rows={4}
              // defaultValue="Default Value"
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              sx={{ flexGrow: 1,width: '100%', maxWidth: 300  }}
            />
            {/* <p>Comments:<textarea value={comments} placeholder="Comments" name="description" onChange={(event) => setComments(event.target.value)}/></p> */}
            <div>
              <h3>{ !status ? <p>Status: Uncomplete</p> : <p>Status: Complete</p> }</h3>
            </div>
              <Stack sx={{margin:5}} direction="row" spacing={2}>
                <button className="btn" onClick={toggleStatus}>Status</button>
                {/* <button className="btn">Share</button> */}
                {/* <button className="btn" onClick={addImage}>Add image</button> */}
                <button className="btnSubmit" onClick={addProject}>Submit</button>
                <button className="btnDelete" onClick={delteProject}>Delete</button>
              </Stack>
            </Grid>
            <Box sx={{ flexGrow: 1,width: '100%', maxWidth: 350}}>
              <h2></h2>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
              <Grid item xs={6}>
              <p>Image<input value={coverImage} type="text" placeholder="Image" onChange={(event) => setCoverImage(event.target.value)}/></p>
              </Grid>
              <Grid item xs={6}>
              <p>Image<input value={coverImage} type="text" placeholder="Image" onChange={(event) => setCoverImage(event.target.value)}/></p>
              </Grid>
              <Grid item xs={6}>
              <p>Image<input value={coverImage} type="text" placeholder="Image" onChange={(event) => setCoverImage(event.target.value)}/></p>
              </Grid>
              <Grid item xs={6}>
              <p>Image<input value={coverImage} type="text" placeholder="Image" onChange={(event) => setCoverImage(event.target.value)}/></p>
              </Grid>
              {/* <p>status:<input value={status} type="checkbox" placeholder="Satus" onChange={(event) => setStatus(event.target.checked)}/></p> */}
              {/* <p>Share:<input value={share} type="text" placeholder="Share" onChange={(event) => setShare(event.target.value)}/></p> */}
              {/* <p>Image<input value={coverImage} type="text" placeholder="Image" onChange={(event) => setCoverImage(event.target.value)}/></p> */}
              {/* <p>Image carousel: <input value={carouselImage} type="text" placeholder="Image" onChange={(event) => setCarouselImage(event.target.value)}/></p> */}
              </Grid>
            </Box>
            
        </Grid>
        </Box>    
        </Box>
      </main>
    );
  }

  // this allows us to use <App /> in index.js
  export default NewProject;
  

  /////
//   import React, { useState, useEffect } from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


// function NewProject() {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const [title, setTitle] = useState('');
//     const [comments, setComments] = useState('');
//     const [share, setShare] = useState('');
//     const [status, setStatus] = useState('');
//     const [coverImage, setCoverImage] = useState('');
//     const { id } = useParams();// used to get the project id to edit   

//     useEffect(() => {
//       if (id) {
//         fetch(`/api/projects/${id}`)
//           .then(response => response.json())
//           .then(project => {
//             console.log('here:', project);
//             setTitle(project.title);
//             setComments(project.comments);
//             setShare(project.share);
//             setStatus(project.status);
//             setCoverImage(project.coverImage);
//         }).catch(error => {
//             console.log(error);
//             alert('something went wrong!');
//           })
//       }
//     }, [id]);
    
//     const goToHome = () => {
//         history.push(`/home`)
//     }

//     const addProject = (event) => {
//       event.preventDefault();
//       if (id) {
//         dispatch({ type: 'EDIT_PROJECT', payload:{ title, comments, share, status, coverImage, id }, history})

//       }else{
//         dispatch({ type: 'ADD_PROJECT', payload: {title, comments, share, status, coverImage}, history});
//         console.log( {title, comments, share, status, coverImage})
//         setTitle('');
//         setComments('');
//         setShare('');
//         setStatus('');
//         setCoverImage('');
//       }
//     };

//     const delteProject = () =>{
//       dispatch({type: 'DELETE_PROJECT', payload:id})
//       goToHome();
//     }

//     return (
//       <main>
//         <div className="container">
//         <h1>{id ? 'Edit Project' : 'New Project'}</h1>
//         {/* <h3>{id}</h3> */}
//         <button className="btn" type="submit" onClick={goToHome}>Go To Home</button>

//         {/* <section className="newProject" onSubmit={addProject}> */}
//         <section className="newProject">
//             <p>Name:<input value={title} type="text" placeholder="New Name" onChange={(event) => {
//               // console.log(event)
//               setTitle(event.target.value)
//               }}/></p>
//             <p>Comments:<textarea value={comments} placeholder="Comments" name="description" onChange={(event) => setComments(event.target.value)}/></p>
//             <p>status:<input value={status} type="checkbox" placeholder="Satus" onChange={(event) => setStatus(event.target.checked)}/></p>
//             <p>Share:<input value={share} type="text" placeholder="Share" onChange={(event) => setShare(event.target.value)}/></p>
//             <p>Image<input value={coverImage} type="text" placeholder="Image" onChange={(event) => setCoverImage(event.target.value)}/></p>
//             <button>Uncomplete</button>
//             <button>Share</button>
//             {/* <button>Delete</button> */}
//             <button className="btn" onClick={addProject}>Submit</button>
//             <button className="btn" onClick={delteProject}>Delete</button>
//         </section>
//         </div>
//       </main>
//     );
//   }

//   // this allows us to use <App /> in index.js
//   export default NewProject;
  