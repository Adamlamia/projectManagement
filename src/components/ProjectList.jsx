import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { collection, getDocs, where, query } from "@firebase/firestore";
import { db } from "../firebase";

const ProjectList = ({ teamName }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsQuery = query(
          collection(db, "projects"),
          where("teamName", "==", teamName)
        );
        const projectDocs = await getDocs(projectsQuery);
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
  }, [teamName]);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={project.id}>
              <td>{index + 1}</td>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                {/* Link to get to the specific project */}
                <Link to={`/project/${project.id}`}>
                  <button>Open</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
