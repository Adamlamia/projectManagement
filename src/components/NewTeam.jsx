import React, { useState } from "react";
import { collection, addDoc, updateDoc, arrayUnion } from "@firebase/firestore";
import { db } from "../firebase";

const NewTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamMemberName, setTeamMemberName] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const handleAddMember = () => {
    if (teamMemberName.trim() !== "") {
      setTeamMembers((prevMembers) => [...prevMembers, teamMemberName]);
      setTeamMemberName("");
    }
  };

  const handleCreateTeam = async () => {
    try {
      if (teamName.trim() === "") {
        alert("Enter a valid team name!");
        return;
      }

      const teamData = {
        teamName: teamName,
        teamDescription: teamDescription,
        teamMembers: teamMembers,
      };

      const docRef = await addDoc(collection(db, "teams"), teamData);

      // Optionally, you can reset the input fields or close the popup after creating the team
      setTeamName("");
      setTeamDescription("");
      setTeamMembers([]);
      setTeamMemberName("");

      console.log("Team created with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  return (
    <div>
      {/* New team form */}
      <form>
        <label>
          Team Name:
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Team Description:
          <textarea
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Team Members:
          <input
            type="text"
            value={teamMemberName}
            onChange={(e) => setTeamMemberName(e.target.value)}
          />
          <button type="button" onClick={handleAddMember}>
            Add Member
          </button>
        </label>
        <ul>
          {teamMembers.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
        <br />
        <button type="button" onClick={handleCreateTeam}>
          Create Team
        </button>
      </form>
    </div>
  );
};

export default NewTeam;
