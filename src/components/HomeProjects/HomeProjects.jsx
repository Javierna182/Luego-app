import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function HomeProjects() {

    const history = useHistory();

    const goToNewProject = (id) => {
        history.push(`/newproject/:id`)//change the id to ${id} once the database is working
    }

  return (
    <main>
        <button type="submit" onClick={() => goToNewProject()}>Add New +</button>
        <h2>Don't forget your good ideas!</h2>
        <section className="projects">
        <button>All</button>
        <button>Uncomplete</button>
        <button>Complete</button>
        {/* <img src={} alt={} /> */}
    </section>
    </main>
  );
}

// this allows us to use <App /> in index.js
export default HomeProjects;
