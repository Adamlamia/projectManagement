// TeamDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Routes, Route, Outlet } from 'react-router-dom';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '../firebase';
import TextEditor from './TextEditor'; // If you have a TextEditor component for team details

const TeamDetails = () => {
  const { teamId } = useParams();
  const [teamDetails, setTeamDetails] = useState(null);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const teamDoc = await getDoc(doc(db, 'teams', teamId));
        setTeamDetails(teamDoc.data());
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  return (
    <div>
      {/* Display team details */}
      {teamDetails && (
        <div>
          <h2>{teamDetails.teamName}</h2>
          <p>{teamDetails.teamDescription}</p>
          {/* Add other team details as needed */}

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
      )}
    </div>
  );
};

export default TeamDetails;
