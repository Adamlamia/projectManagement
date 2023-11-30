import React, { useState } from "react";
import NewProject from "../components/NewProject"; // Import the NewProject component

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const handleNewProjectClick = () => {
    setShowNewProjectModal(true);
  };

  const handleNewProjectClose = () => {
    setShowNewProjectModal(false);
  };

  const handleProjectCreated = (newProject) => {
    setProjects([...projects, newProject]);
  };

  return (
    <div className="flex w-full mb-2 px-2">
      <button
        onClick={handleNewProjectClick}
        className="bg-green-500 text-white rounded-lg px-5 py-2"
      >
        New Project
      </button>

      {showNewProjectModal && (
        <NewProject
          onClose={handleNewProjectClose}
          onProjectCreated={handleProjectCreated}
        />
      )}

      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <a href={`/project/${project.id}`}>{project.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Project;
