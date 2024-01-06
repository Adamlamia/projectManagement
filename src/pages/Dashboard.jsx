import React from "react";
import TextEditor from "../components/TextEditor";
import Material from "../components/Material";

const Dashboard = () => {
  return (
    <div className="flex w-full mb-2 px-2">
      <div className="flex grid h-full pl-2 card place-items-center">
        <div>
          <div className="grid rounded m-2  place-content-center">
            <div className="stats bg-primary text-primary-content">

              <div className="stat">
                <div className="stat-title">Completed Task</div>
                <div className="stat-value">"Task Name"</div>
                <div className="stat-actions">
                  <button className="btn btn-sm btn-success">Open Project</button>
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">In Progress</div>
                <div className="stat-value">"Task Name"</div>
                <div className="stat-actions">
                  <button className="btn btn-sm">Open Task</button>
                  <button className="btn btn-sm">Mark Done</button>
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <div className="avatar online">
                    <div className="w-16 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                </div>
                <div className="stat-value">86%</div>
                <div className="stat-title">Tasks done</div>
                <div className="stat-desc text-secondary">31 tasks remaining</div>
              </div>

            </div>
          </div>
          <div className="grid rounded m-2  place-content-center">
            <div className="stats bg-primary text-primary-content">

              <div className="stat">
                <div className="stat-title">Completed Task</div>
                <div className="stat-value">"Task Name"</div>
                <div className="stat-actions">
                  <button className="btn btn-sm btn-success">Open Project</button>
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">In Progress</div>
                <div className="stat-value">"Task Name"</div>
                <div className="stat-actions">
                  <button className="btn btn-sm">Open Task</button>
                  <button className="btn btn-sm">Mark Done</button>
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <div className="avatar online">
                    <div className="w-16 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                </div>
                <div className="stat-value">86%</div>
                <div className="stat-title">Tasks done</div>
                <div className="stat-desc text-secondary">31 tasks remaining</div>
              </div>

            </div>
          </div>
          <div className="grid rounded m-2  place-content-center">
            <div className="stats bg-primary text-primary-content">

              <div className="stat">
                <div className="stat-title">Completed Task</div>
                <div className="stat-value">"Task Name"</div>
                <div className="stat-actions">
                  <button className="btn btn-sm btn-success">Open Project</button>
                </div>
              </div>

              <div className="stat">
                <div className="stat-title">In Progress</div>
                <div className="stat-value">"Task Name"</div>
                <div className="stat-actions">
                  <button className="btn btn-sm">Open Task</button>
                  <button className="btn btn-sm">Mark Done</button>
                </div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <div className="avatar online">
                    <div className="w-16 rounded-full">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                  </div>
                </div>
                <div className="stat-value">86%</div>
                <div className="stat-title">Tasks done</div>
                <div className="stat-desc text-secondary">31 tasks remaining</div>
              </div>

            </div>
          </div>
        </div>
        <TextEditor />
      </div>
    </div>
  );
};

export default Dashboard;
