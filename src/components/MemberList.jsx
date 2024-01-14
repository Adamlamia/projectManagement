import React from "react";

const MemberList = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Member</th>
            <th>Role</th>
            <th>Task</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="bg-base-200">
            <th>1</th>
            <td>Adam</td>
            <td>Quality Control Specialist</td>
            <td>2</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Khairul</td>
            <td>Desktop Support Technician</td>
            <td>1</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Lamia</td>
            <td>Tax Accountant</td>
            <td>4</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MemberList;
