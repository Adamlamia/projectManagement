/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewProject from "../components/NewProject";
import { db } from "../firebase";
import { fetchData } from "../context/FetchData"; // Adjust the path accordingly

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  const toggleNewProjectForm = () => {
    setShowNewProjectForm(!showNewProjectForm);
  };

  // Usage for fetching projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await fetchData(db, "projects");
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
      <button
        className="btn btn-active btn-primary m-3"
        onClick={toggleNewProjectForm}
      >
        Create New Project
      </button>

      {/* Display a list of projects as buttons */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Team</th> {/* New column for Team */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={project.id}>
                <th>{index + 1}</th>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.teamName}</td> {/* Check if team exists */}
                <td>
                  <Link to={`/project/${project.id}`}>
                    <button>Open</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display the new project form based on the state */}
      {showNewProjectForm && <NewProject />}
    </div>
  );
};

export default Project;
