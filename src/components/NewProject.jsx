import React, { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebase";

const NewProject = ({ onClose, onProjectCreated }) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleCreateProject = async () => {
    try {
      const projectsCollectionRef = collection(db, "projects");
      const newProjectRef = await addDoc(projectsCollectionRef, {
        name: projectName,
        description: projectDescription,
      });

      onProjectCreated({
        id: newProjectRef.id,
        name: projectName,
        description: projectDescription,
      });

      onClose();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">New Project</h2>
        <label>
          Project Name:
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
        </label>
        <label>
          Project Description:
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
        </label>
        <div className="flex justify-end">
          <button
            onClick={handleCreateProject}
            className="bg-blue-500 text-white rounded-lg px-5 py-2"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="ml-2 bg-gray-500 text-white rounded-lg px-5 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
