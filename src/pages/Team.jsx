import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewTeam from "../components/NewTeam";
import { db } from "../firebase";
import { fetchData } from '../context/FetchData';

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [showNewTeamForm, setShowNewTeamForm] = useState(false);

  const toggleNewTeamForm = () => {
    setShowNewTeamForm(!showNewTeamForm);
  };

  // Usage for fetching teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await fetchData(db, "teams");
        setTeams(teamsData);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      {/* Button display of the new team form */}
      <button
        className="btn btn-active btn-primary m-3"
        onClick={toggleNewTeamForm}
      >
        Create New Team
      </button>

      {/* Display a list of teams with buttons */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Members</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={team.id}>
                <th>{index + 1}</th>
                <td>{team.teamName}</td>
                <td>{team.teamDescription}</td>
                <td>{team.teamMembers ? team.teamMembers.join(", ") : ""}</td> {/* Check if teamMembers exists */}
                <td>
                  <Link to={`/team/${team.id}`}>
                    <button>Open</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display the new team form */}
      {showNewTeamForm && <NewTeam />}
    </div>
  );
};

export default Team;

