import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "@firebase/firestore";
import { db } from "../firebase";
import TaskList from "./TaskList";

const ProjectStatus = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectDocs = await getDocs(collection(db, "projects"));
        const projectData = projectDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id} className="collapse collapse-arrow bg-base-200">
          <input type="radio" name={`my-accordion-${project.id}`} />
          <div className="collapse-title text-xl font-medium">
            <div className="grid rounded m-2 place-content-center">
              <div className="stats bg-primary text-primary-content">
                {/* Display project title under the "name" field */}
                <div className="stat">
                  <div className="stat-title">Project Title</div>
                  <div className="stat-value">{project.name}</div>
                </div>

                {/* Other stats... */}

              </div>
            </div>
          </div>

          {/* Accordion content with TaskList component */}
          <div className="collapse-content">
            <TaskList projectId={project.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStatus;
