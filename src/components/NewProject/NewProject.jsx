import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NewProject() {

    const history = useHistory();

    const goToHomeProject = () => {
        history.push(`/homeprojects`)
    }

    return (
      <main>
        <h1>New Project</h1>
        <button type="submit" onClick={goToHomeProject}>Go To Home</button>
      </main>
    );
  }
  
  // this allows us to use <App /> in index.js
  export default NewProject;
  