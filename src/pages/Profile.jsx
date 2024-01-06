import React from "react";
import TextEditor from "../components/TextEditor";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  return (
    <div className="grid w-fit card bg-base-300 mb-2 px-2 rounded-b-lg place-items-center z-0">
      <div className="m-4 place-item-center">
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
