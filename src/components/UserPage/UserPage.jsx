import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const projects = useSelector(store => store.projects);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECTS'});
  }, []);

    const goToNewProject = () => {
        history.push(`/addproject`)
    }

    const goToProjectDetails = (id) => {
      history.push(`/ProjectDetails/${id}`)
  }

  return (
    <main>
      <div className="container">
      <button className="btn" onClick={() => goToNewProject()}>Add New +</button>
        <h2>Don't forget your good ideas!</h2>
          <button>All</button>
          <button>Uncomplete</button>
          <button>Complete</button>
        <section className="projects">
            {projects.map(project => {
                return(
                <div key={project.id}>
                    <h3>{project.title}</h3>
                    <h4>{project.comments}</h4>
                    <h4>status:{project.status}</h4>
                    <h4>{project.share}</h4>
                    <img src={project.coverImage} alt={project.title}/>
                    <button className="btn" onClick={() => goToProjectDetails(project.id)}>Details</button>
                </div>
                );
          })}
      </section>
    <h2>Welcome, {user.username}!</h2>
    <p>Your ID is: {user.id}</p>
    <LogOutButton className="btn" />
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