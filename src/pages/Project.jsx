import React from "react";
import TextEditor from "../components/TextEditor";
import Material from "../components/Material";

const Project = () => {
  return (
    <div className="flex w-full mb-2 px-2">
      <div className="flex grid h-full w-4/5 pl-2 card place-items-center">
        <h1>Hello Project</h1>
        <TextEditor />
      </div>
      <div className="divider px-2"></div>
      <div className="grid h-screen w-1/5 card bg-base-300 rounded-b-lg place-items-center">
        <div className="mx-2">
          <Material />
        </div>
      </div>
    </div>
  );
};

export default Project;
