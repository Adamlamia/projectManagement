import React from "react";
import TextEditor from "../components/TextEditor";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  return (
    <div className="w-full mb-2 px-2">
      <div className="grid h-screen card bg-base-300 rounded-b-lg place-items-center">
        <div className="mx-2">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
