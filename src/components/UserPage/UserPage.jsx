import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useState } from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const [userProjects, setUserProjects] = useState([]);

  const history = useHistory();

    const goToNewProject = (id) => {
        history.push(`/newproject/:id`)//change the id to ${id} once the database is working
    }

  useEffect(() => {
    fetchUserProjects();
  }, []);

  const fetchUserProjects =  () => {
    fetch('/api/projects').then(response => {
      if(response.ok){
        return response.json();
      } else{
        throw new Error("Request not OK");
      }
    }).then(userProjectsFromServer => {
      setUserProjects(userProjectsFromServer);
    }).catch(error => {
      console.log(error);
      alert('Something went wrong');
    })
  }

  return (
    <main>
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <button type="submit" onClick={() => goToNewProject()}>Add New +</button>
        <h2>Don't forget your good ideas!</h2>
        <section className="projects">
          <button>All</button>
          <button>Uncomplete</button>
          <button>Complete</button>
      {
        userProjects.map(project => (
          <div key={project.id}>
            <h3>{project.title}</h3>
            <h4>{project.comments}</h4>
            <h4>{project.status}</h4>
            <h4>{project.share}</h4>
            <img src={project.coverImage} alt={project.title}/>
          </div>
        ))
      }
      </section>
    <LogOutButton className="btn" />
    </div>
    </main>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
