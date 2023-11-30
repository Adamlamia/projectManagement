import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import NewProject from "../components/NewProject";
import ProjectDetails from "../components/ProjectDetail";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  const toggleNewProjectForm = () => {
    setShowNewProjectForm(!showNewProjectForm);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = [];
        querySnapshot.forEach((doc) => {
          projectsData.push({ id: doc.id, ...doc.data() });
        });
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      {/* Button to toggle the display of the new project form */}
      <button onClick={toggleNewProjectForm}>Create New Project</button>

      {/* Display a list of projects as buttons */}
      {projects.map((project) => (
        <Link key={project.id} to={`/project/${project.id}`}>
          <button>{project.name}</button>
        </Link>
      ))}

      {/* Display the new project form based on the state */}
      {showNewProjectForm && <NewProject />}
    </div>
  );
};

export default Project;
