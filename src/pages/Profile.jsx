import React from "react";
import TextEditor from "../components/TextEditor";
import UserProfile from "../components/UserProfile";

const Profile = () => {
  return (
    <div className="flex w-full mb-2 px-2">
      <div className="flex grid h-full w-2/5 pl-2 card place-items-center">
        {<TextEditor /> }
      </div>
      <div className="divider px-2"></div>
      <div className="grid h-screen w-3/5 card bg-base-300 rounded-b-lg place-items-center">
        <div className="mx-2">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
