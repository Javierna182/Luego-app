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

        <section className="newProject">
            <input type="text" placeholder="New Name"/>
            <textarea placeholder="Comments" name="description"/>

            {/* <img src={} alt={} /> */}    

            <button>Uncomplete</button>
            <button>Share</button>
            <button>Delete</button>
        </section>
      </main>
    );
  }
  
  // this allows us to use <App /> in index.js
  export default NewProject;
  