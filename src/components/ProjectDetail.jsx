/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Routes, Route, Outlet, Link } from "react-router-dom";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  where,
  query,
} from "@firebase/firestore";
import { db } from "../firebase";
import TextEditor from "./TextEditor";
import TaskList from "./TaskList";
import NewTask from "./NewTask";
import EditTask from "./EditTask";
import UploadFile from "./UploadFile";
import FileList from "./FileList";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useEffect(() => {
    //Fetch ProjectDetail
    const fetchProjectDetails = async () => {
      try {
        const projectDoc = await getDoc(doc(db, "projects", projectId));
        setProjectDetails(projectDoc.data());
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    // Count number of completion as true
    const fetchTaskCounts = async () => {
      try {
        const taskCollection = collection(db, "projects", projectId, "tasks");
        const totalTasksQuery = await getDocs(taskCollection);
        setTotalTasks(totalTasksQuery.size);

        const completedTasksQuery = await getDocs(
          query(taskCollection, where("completion", "==", true))
        );
        setCompletedTasks(completedTasksQuery.size);
      } catch (error) {
        console.error("Error fetching task counts:", error);
      }
    };

    fetchProjectDetails();
    fetchTaskCounts();
  }, [projectId]);

  const toggleNewTaskForm = () => {
    setShowNewTaskForm(!showNewTaskForm);
    setEditTaskId(null);
  };

  const handleEditTask = (taskId) => {
    setEditTaskId(taskId);
    setShowNewTaskForm(true);
  };

  const updateCompletionInDatabase = async () => {
    try {
      const projectRef = doc(db, "projects", projectId);
      await updateDoc(projectRef, {
        taskList: totalTasks - completedTasks,
        completionPercentage:
          totalTasks === 0
            ? 0
            : Math.floor((completedTasks / totalTasks) * 100),
      });
    } catch (error) {
      console.error("Error updating completion in the database:", error);
    }
  };

  useEffect(() => {
    // Call the updateCompletionInDatabase
    updateCompletionInDatabase();
  }, [totalTasks, completedTasks, projectId]);

  const completionPercentage =
    totalTasks === 0 ? 0 : Math.floor((completedTasks / totalTasks) * 100);

  return (
    <div>
      {/* Display project details */}
      {projectDetails && (
        <div className="flex w-full">
          <div className="flex w-3/4 h-screen flex-grow card bg-base-300 rounded-box place-items-center p-4">
            <div className="stats shadow p-4">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <div className="stat-title">Project</div>
                  <div className="stat-value text-primary">
                    {projectDetails.name}
                  </div>
                  <div className="stat-desc">{projectDetails.description}</div>
                </div>
              </div>
              <div className="stat">
                <div className="stat-figure text-primary">
                  <div className="stat-title">Team</div>
                  <div className="stat-value text-primary">
                    {projectDetails.teamName}
                  </div>
                  <div className="stat-desc">Small thing below</div>
                </div>
              </div>
              <div className="stat">
                <div className="stat-figure text-secondary"></div>
                <div className="stat-value">{completionPercentage}%</div>
                <div className="stat-title">Tasks done</div>
                <div className="stat-desc text-secondary">
                  {totalTasks - completedTasks} tasks remaining
                </div>
              </div>
            </div>
            <div className="min-h-32 max-h-max min-w-64 max-w-screen-md card bg-base-200 rounded-box place-items-center p-4">
              {/* Integrated BlockNote editor */}
              <TextEditor projectId={projectId} />
            </div>
            <div className="p-4">
              {/* File uploader */}
              <UploadFile projectId={projectId} />
            </div>
            {/* Nested routes for project details */}
            <Routes>
              <Route
                path="/"
                element={<Outlet>Project details main page</Outlet>}
              />
              {/* Add other routes as needed */}
            </Routes>
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="flex w-3/8 h-screen flex-grow card bg-base-300 rounded-box place-items-center p-4">
            <div>
              <h3>Task List</h3>
              <div className="flex w-fill bg-base-200 rounded-box p-4">
                <TaskList
                  projectId={projectId}
                  handleEditTask={handleEditTask}
                />
              </div>
              <button
                className="btn btn-active btn-primary m-3"
                onClick={toggleNewTaskForm}
              >
                Create New Task
              </button>
              {showNewTaskForm && (
                <div className="card bg-base-300 rounded-box place-items-center p-4">
                  {editTaskId ? (
                    <EditTask
                      taskId={editTaskId}
                      toggleForm={toggleNewTaskForm}
                    />
                  ) : (
                    <NewTask
                      projectId={projectId}
                      toggleForm={toggleNewTaskForm}
                    />
                  )}
                </div>
              )}
            </div>
            <div>
              <h3>File List</h3>
              <FileList />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
