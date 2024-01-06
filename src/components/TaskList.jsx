import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "@firebase/firestore";
import { db } from "../firebase";

const TaskList = ({ projectId, handleEditTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskDocs = await getDocs(collection(db, "projects", projectId, "tasks"));
        const taskData = taskDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(taskData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [projectId]);

  const handleCheckboxChange = async (taskId, currentCompletion) => {
    try {
      // Toggle the completion status
      const updatedCompletion = !currentCompletion;

      // Update the task document with the new completion status
      const taskDocRef = doc(db, "projects", projectId, "tasks", taskId);
      await updateDoc(taskDocRef, { completion: updatedCompletion });

      // Update the local state with the updated completion status
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completion: updatedCompletion } : task
        )
      );
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <button onClick={() => handleEditTask(task.id)}>Edit</button>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={task.completion}
                    onChange={() => handleCheckboxChange(task.id, task.completion)}
                  />
                  Mark as Complete
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
