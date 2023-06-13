import React from "react";
import TextEditor from "../components/TextEditor";
import Material from "../components/Material";

const Dashboard = () => {
  return (
    <div class="columns-2 w-xl">
      <div class="static w-3/4 h-full">
        <TextEditor />
      </div>
      <div class="static w-1/4 h-fit">
        <Material />
      </div>
    </div>
  );
};

export default Dashboard;
