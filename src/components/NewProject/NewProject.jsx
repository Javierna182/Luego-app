import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
// import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NewProject() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [comments, setComments] = useState('');
    const [share, setShare] = useState('');
    const [status, setStatus] = useState('');
    const [coverImage, setCoverImage] = useState('');
   
    const goToHome = () => {
        history.push(`/home`)
    }

    const addProject = (event) => {
      event.preventDefault();
      // dispatch({ type: 'ADD_PROJECT', payload: {title}});
      dispatch({ type: 'ADD_PROJECT', payload: {title, comments, share, status, coverImage}});
      console.log( {title, comments, share, status, coverImage})
      setTitle('');
      setComments('');
      setShare('');
      setStatus('');
      setCoverImage('');
    }

    return (
      <main>
        <div className="container">
        <h1>New Project</h1>
        <button className="btn" type="submit" onClick={goToHome}>Go To Home</button>

        {/* <section className="newProject" onSubmit={addProject}> */}
        <section className="newProject">
            <input type="text" placeholder="New Name" onChange={(event) => {
              console.log(event)
              setTitle(event.target.value)
              }}/>
            <textarea placeholder="Comments" name="description" onChange={(event) => setComments(event.target.value)}/>
            <input type="checkbox" placeholder="Satus" onChange={(event) => setStatus(event.target.checked)}/>
            <input type="text" placeholder="Share" onChange={(event) => setShare(event.target.value)}/>
            <input type="text" placeholder="Image" onChange={(event) => setCoverImage(event.target.value)}/>
            <button>Uncomplete</button>
            <button>Share</button>
            <button>Delete</button>
            <button className="btn" type="submit" onClick={addProject}>Submit</button>
        </section>
        </div>
      </main>
    );
  }

  // this allows us to use <App /> in index.js
  export default NewProject;
  