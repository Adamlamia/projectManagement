import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { collection, doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "../firebase";
import { fetchData } from "../context/FetchData";

const UserProfile = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userMatrixNumber, setUserMatrixNumber] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [additionalId, setAdditionalId] = useState("");
  const { currentUser } = UserAuth();

  // For fetching user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileData = await fetchData(
          db,
          "userProfile",
          currentUser.uid
        );
        if (userProfileData) {
          setUserName(userProfileData.userName);
          setUserEmail(userProfileData.userEmail);
          setUserMatrixNumber(userProfileData.userMatrixNumber);
          setUserDepartment(userProfileData.userDepartment);
          setAdditionalId(userProfileData.additionalId);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userProfileRef = doc(db, "userProfile", currentUser.uid);
      await setDoc(userProfileRef, {
        userName,
        userEmail,
        userMatrixNumber,
        userDepartment,
        additionalId,
      });
      console.log("User profile updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label>
          User ID: <strong>{currentUser.uid}</strong>
        </label>
        <label>
          User Name:
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Enter User Name"
          />
        </label>
        <label>
          User Email:
          <input
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            type="email"
            placeholder="Enter User Email"
          />
        </label>
        <label>
          User Matrix Number:
          <input
            value={userMatrixNumber}
            onChange={(e) => setUserMatrixNumber(e.target.value)}
            type="text"
            placeholder="Enter User Matrix Number"
          />
        </label>
        <label>
          User Department:
          <input
            value={userDepartment}
            onChange={(e) => setUserDepartment(e.target.value)}
            type="text"
            placeholder="Enter User Department"
          />
        </label>
        {/* <label>
          Additional ID:
          <input
            value={additionalId}
            onChange={(e) => setAdditionalId(e.target.value)}
            type="text"
            placeholder="Enter Additional ID"
          />
        </label> */}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-5 py-2 mt-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
