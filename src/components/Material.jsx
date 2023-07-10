import React from "react";

const Material = () => {
  return (
    <div className="card w-full bg-base-100 shadow-xl ">
      {/* <figure className="px-10 pt-10">
        <img
          src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
          className="rounded-xl"
        />
      </figure> */}
      <div className="card-body items-center text-center">
        <h2 className="card-title">Task 1</h2>
        <p>Test Incident sention 3.2.1 'Ambient'</p>
        <div className="card-actions">
          <button className="btn btn-primary">Completed</button>
        </div>
      </div>
    </div>
  );
};

export default Material;
