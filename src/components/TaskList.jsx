import React, { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase";

const TaskList = ({ projectId, handleEditTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Retrieve tasks from the "tasks" subcollection under the specified project
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
                  <input type="checkbox" className="checkbox" />
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
