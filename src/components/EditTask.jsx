import React, { useState } from "react";
import { updateDoc, doc } from "@firebase/firestore";
import { db } from "../firebase";

const EditTask = ({ taskId, toggleForm }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedName, setAssignedName] = useState("");

  const handleEditTask = async () => {
    try {
      const taskRef = doc(db, "projects", "projectId", "tasks", taskId);
      const updatedTaskData = {
        title: taskTitle,
        description: taskDescription,
        assignedName: assignedName,
      };

      // Update task in the "tasks" subcollection under the specified project
      await updateDoc(taskRef, updatedTaskData);

      // Optionally, you can reset the input fields or close the popup after editing the task
      setTaskTitle("");
      setTaskDescription("");
      setAssignedName("");

      // Close the form
      toggleForm();
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <div>
      {/* Task edit form */}
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
        <button type="button" onClick={handleEditTask}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditTask;
