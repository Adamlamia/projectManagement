// TeamDetail.jsx
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Routes, Route, Outlet } from "react-router-dom";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../firebase";
import TextEditor from "./TextEditor"; // If you have a TextEditor component for team details
import MemberList from "./MemberList";
import ProjectList from "./ProjectList";

const TeamDetails = () => {
  const { teamId } = useParams();
  const [teamDetails, setTeamDetails] = useState(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const teamDoc = await getDoc(doc(db, "teams", teamId));
        setTeamDetails(teamDoc.data());
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  return (
    <div>
      {/* Display team details */}
      {teamDetails && (
        <div>
          <div>
            {/* Nested routes for team details */}
            <Routes>
              <Route
                path="/"
                element={<Outlet>Team details main page</Outlet>}
              />
              <Route path="text-editor" element={<TextEditor />} />
              {/* Add more nested routes as needed */}
            </Routes>
          </div>
          <div className="card flex-grow w-fit bg-neutral text-neutral-content ">
            <div className="card-body items-center text-center">
              <h2 className="card-title">{teamDetails.teamName}</h2>
              <p>{teamDetails.teamDescription}</p>
              <div className="flex w-full">
                <div className="grid h-20 flex-grow card  rounded-box place-items-center">
                  <div
                    tabIndex={0}
                    className="collapse border border-base-300 bg-base-200"
                  >
                    <div className="collapse-title text-xl font-medium">
                      Member
                    </div>
                    <div className="collapse-content">
                    Member will be display similarly as the tasklist
                      <MemberList teamId={teamId} />
                    </div>
                  </div>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="grid h-20 flex-grow card  rounded-box place-items-center">
                  <div
                    tabIndex={0}
                    className="collapse border border-base-300 bg-base-200"
                  >
                    <div className="collapse-title text-xl font-medium">
                      Project
                    </div>
                    <div className="collapse-content">
                      <div>
                        check projects collection, find field labeled with current team name
                        <ProjectList teamName={teamDetails.teamName} />
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
