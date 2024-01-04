import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firebase";

const NewTask = ({ projectId, toggleForm }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedName, setAssignedName] = useState("");

  const handleCreateTask = async () => {
    try {
      if (taskTitle.trim() === "") {
        alert("Enter a valid task title!");
        return;
      }

      const taskData = {
        title: taskTitle,
        description: taskDescription,
        assignedName: assignedName,
      };

      // Add task to the "tasks" subcollection under the specified project
      await addDoc(collection(db, "projects", projectId, "tasks"), taskData);

      // Optionally, you can reset the input fields or close the popup after creating the task
      setTaskTitle("");
      setTaskDescription("");
      setAssignedName("");

      // Close the form
      toggleForm();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div>
      {/* Task form */}
      <form>
        <label>
          Task Title:
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Task Description:
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Assigned Name:
          <input
            type="text"
            value={assignedName}
            onChange={(e) => setAssignedName(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateTask}>
          Create Task
        </button>
      </form>
    </div>
  );
};

export default NewTask;
