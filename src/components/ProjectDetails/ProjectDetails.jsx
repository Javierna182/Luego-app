import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProjectDetails() {

    const {id} = useParams();// use to grab the id from the url 
    const projects = useSelector(store => store.projects);// use to select from the projects DB
    const project = projects.find(project => project.id == id);// filters the projects so we get the project that we want

    const images = useSelector(store => store.images);// use to select from the images DB

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
    
    if (project === undefined){
      return null;
    }
    return (
      <main>
        <div className="container" >
        <button className="btn" type="submit" onClick={goToHome}>Go To Home</button>

        
        <section className="project">
            
                <div key={project.id}>
                    <h3>{project.title}</h3>
                    <h4>{project.comments}</h4>
                    <h4>{project.status}</h4>
                    <h4>{project.share}</h4>
                    <img src={project.coverImage} alt={project.title}/>
                    <ul>
                      {
                        images.map(imagesToDisplay => <div key={imagesToDisplay.url}>
                          <li>
                          <img src={imagesToDisplay.url} alt={imagesToDisplay.name}/>
                          </li>
                        </div>)
                      }
                    </ul>
                    <button className="btn" onClick={goToEdit}>Edit</button>
                </div>
               
            {/* <input type="text" placeholder="New Name"/>
            <textarea placeholder="Comments" name="description"/> */}
            {/* <img src={} alt={} /> */}    
            <button>Uncomplete</button>
            <button>Share</button>
            <button>Delete</button>
        </section>
        </div>
      </main>
    );
  }
  
  // this allows us to use <App /> in index.js
  export default ProjectDetails;
  