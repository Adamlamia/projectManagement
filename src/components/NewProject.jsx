import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { db } from "../firebase";

const NewProject = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(""); // Use string for selectedTeam
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsSnapshot = await getDocs(collection(db, "teams"));
        const teamsData = teamsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  const handleCreateProject = async () => {
    try {
      if (projectName.trim() === "") {
        alert("Enter a valid project name!");
        return;
      }

      if (!selectedTeam) {
        alert("Select a team for the project!");
        return;
      }

      const projectData = {
        name: projectName,
        description: projectDescription,
        teamName: selectedTeam,
      };

      await addDoc(collection(db, "projects"), projectData);

      setProjectName("");
      setProjectDescription("");
      setSelectedTeam("");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div>
      {/* New project form */}
      <form>
        <label>
          Project Name:
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Project Description:
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Select Team:
          <select
            className="select w-full max-w-xs"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
          >
            <option disabled value="">
              Pick a team
            </option>
            {teams.map((team) => (
              <option key={team.id} value={team.teamName}>
                {team.teamName}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button type="button" onClick={handleCreateProject}>
          Create Project
        </button>
      </form>
    </div>
  );
};

export default NewProject;
