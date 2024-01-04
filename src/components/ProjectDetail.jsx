// ProjectDetails.js
import React, { useEffect, useState } from "react";
import { useParams, Routes, Route, Outlet } from "react-router-dom";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../firebase";
import TextEditor from "./TextEditor";
import ProjectTask from "./ProjectTask";
import TaskList from "./TaskList"; // Import the new TaskList component

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const projectDoc = await getDoc(doc(db, "projects", projectId));
        setProjectDetails(projectDoc.data());
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  return (
    <div>
      {/* Display project details */}
      {projectDetails && (
        <div className="flex w-full">
          <div className="grid w-3/4 h-screen flex card bg-base-300 rounded-box place-items-center">
            <h2>{projectDetails.name}</h2>
            <p>{projectDetails.description}</p>
            {/* Integrated BlockNote editor */}
            <TextEditor projectId={projectId} />
            {/* Nested routes for project details */}
            <Routes>
              <Route
                path="/"
                element={<Outlet>Project details main page</Outlet>}
              />
              {/* Add other routes as needed */}
            </Routes>
          </div>
          <div className="divider divider-horizontal">OR</div>
          {""}
          <div className="grid w-1/4 h-screen flex-grow card bg-base-300 rounded-box place-items-center">
            <ProjectTask projectID={projectId} />
            {/* Display the TaskList component */}
            <TaskList projectId={projectId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
