import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "@firebase/firestore";
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
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-title">Project</div>
                <div className="stat-value text-primary">{project.name}</div>
                <div className="stat-desc">Date of creation</div>
              </div>

              <div className="stat">
                <div className="stat-title">Team</div>
                <div className="stat-value text-secondary">{project.teamName}</div>
                <div className="stat-desc">Jibberish</div>
              </div>

              <div className="stat">
                <div className="stat-value">{project.completionPercentage}%</div>
                <div className="stat-title">Tasks done</div>
                <div className="stat-desc text-secondary">
                  {project.taskList} tasks remaining
                </div>
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
