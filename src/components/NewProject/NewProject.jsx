import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function NewProject() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [comments, setComments] = useState('');
    const [share, setShare] = useState('');
    const [status, setStatus] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const { id } = useParams();// used to get the project id to edit   

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
    
    const goToHome = () => {
        history.push(`/home`)
    }

    const addProject = (event) => {
      event.preventDefault();
      if (id) {
        dispatch({ type: 'EDIT_PROJECT', payload:{ title, comments, share, status, coverImage, id }, history})

      }else{
        dispatch({ type: 'ADD_PROJECT', payload: {title, comments, share, status, coverImage}, history});
        console.log( {title, comments, share, status, coverImage})
        setTitle('');
        setComments('');
        setShare('');
        setStatus('');
        setCoverImage('');
      }
    };

    const delteProject = () =>{
      dispatch({type: 'DELETE_PROJECT', payload:id})
      goToHome();
    }

    return (
      <main>
        <div className="container">
        <h1>{id ? 'Edit Project' : 'New Project'}</h1>
        <h3>{id}</h3>
        <button className="btn" type="submit" onClick={goToHome}>Go To Home</button>

        {/* <section className="newProject" onSubmit={addProject}> */}
        <section className="newProject">
            <input value={title} type="text" placeholder="New Name" onChange={(event) => {
              // console.log(event)
              setTitle(event.target.value)
              }}/>
            <textarea placeholder="Comments" name="description" onChange={(event) => setComments(event.target.value)}/>
            <input type="checkbox" placeholder="Satus" onChange={(event) => setStatus(event.target.checked)}/>
            <input type="text" placeholder="Share" onChange={(event) => setShare(event.target.value)}/>
            <input type="text" placeholder="Image" onChange={(event) => setCoverImage(event.target.value)}/>
            <button>Uncomplete</button>
            <button>Share</button>
            {/* <button>Delete</button> */}
            <button className="btn" onClick={addProject}>Submit</button>
            <button className="btn" onClick={delteProject}>Delete</button>
        </section>
        </div>
      </main>
    );
  }

  // this allows us to use <App /> in index.js
  export default NewProject;
  