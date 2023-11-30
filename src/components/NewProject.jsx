import React, { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../firebase";

const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleCreateProject = async () => {
    try {
      if (projectName.trim() === "") {
        alert("Enter a valid project name!");
        return;
      }

      const projectData = {
        name: projectName,
        description: projectDescription,
      };

      await addDoc(collection(db, "projects"), projectData);

      // Optionally, you can reset the input fields or close the popup after creating the project
      setProjectName("");
      setProjectDescription("");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div>
      {/* New project form */}
      <form>
        <label>
          Project Name:
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Project Description:
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateProject}>
          Create Project
        </button>
      </form>
    </div>
  );
};

export default NewProject;
