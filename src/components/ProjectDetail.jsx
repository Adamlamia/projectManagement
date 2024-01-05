/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Routes, Route, Outlet, Link } from "react-router-dom";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../firebase";
import TextEditor from "./TextEditor";
import TaskList from "./TaskList";
import NewTask from "./NewTask"; // Import the NewTask component
import EditTask from "./EditTask"; // Import the EditTask component

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

  // State to manage the display of NewTask and EditTask forms
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const toggleNewTaskForm = () => {
    setShowNewTaskForm(!showNewTaskForm);
  };

  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    setShowNewTaskForm(true);
  };

  return (
    <div>
      {/* Display project details */}
      {projectDetails && (
        <div className="flex w-full">
          <div className="flex w-3/4 h-screen flex card bg-base-300 rounded-box place-items-center p-4">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
                <div className="stat-title">Project</div>
                <div className="stat-value text-primary">
                  {projectDetails.name}
                </div>
                <div className="stat-desc">Small thing below</div>
              </div>
              <div className="stat">
                <div className="stat-figure text-secondary"></div>
                <div className="stat-value">86%</div>
                <div className="stat-title">Tasks done</div>
                <div className="stat-desc text-secondary">
                  31 tasks remaining
                </div>
              </div>
            </div>
            <div className="grid rounded m-2  place-content-center">
              <p>{projectDetails.description}</p>
            </div>
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
          {showNewTaskForm ? (
            // Display NewTask or EditTask form based on the state
            <div className="grid w-1/4 h-screen flex-grow card bg-base-300 rounded-box place-items-center p-4">
              {editTaskId ? (
                <EditTask taskId={editTaskId} toggleForm={toggleNewTaskForm} />
              ) : (
                <NewTask projectId={projectId} toggleForm={toggleNewTaskForm} />
              )}
            </div>
          ) : (
            // Display TaskList and options to create new task
            <div className="flex w-1/4 h-screen flex-grow card bg-base-300 rounded-box place-items-center p-4">
              <h3>Task List</h3>
              <div className="flex w-fill bg-base-200 rounded-box p-4">
                <TaskList
                  projectId={projectId}
                  handleEditTask={handleEditTask}
                />
                <button onClick={toggleNewTaskForm}>Create New Task</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
