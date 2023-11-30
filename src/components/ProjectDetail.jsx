import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../firebase";
import TextEditor from './TextEditor';

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
        <div>
          <h2>{projectDetails.name}</h2>
          <p>{projectDetails.description}</p>
          {/* Add other project details as needed */}
          <TextEditor/>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
