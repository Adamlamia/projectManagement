import React from "react";

const ProjectList = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="bg-base-200">
            <th>1</th>
            <td>Project Alpha</td>
            <td>Quality Control Specialist</td>
            <td>
              {/* here link to get to the specific project
              <Link to={`/project/${project.id}`}>
                <button>Open</button>
              </Link>
              */}
            </td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Project Beta</td>
            <td>Desktop Support Technician</td>
            <td>
              {/* here link to get to the specific project
              <Link to={`/project/${project.id}`}>
                <button>Open</button>
              </Link>
              */}
            </td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Project Charlie</td>
            <td>Tax Accountant</td>
            <td>
              {/* here link to get to the specific project
              <Link to={`/project/${project.id}`}>
                <button>Open</button>
              </Link>
              */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
