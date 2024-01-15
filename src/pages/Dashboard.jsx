import React from "react";
import TextEditor from "../components/TextEditor";
import ProjectStatus from "../components/ProjectStatus";

const Dashboard = () => {
  return (
    <div className="flex grid w-full mb-2 px-2 place-item-center ">
      <div className="flex grid h-full pl-2 card place-items-center">
        <div>
          <ProjectStatus />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
