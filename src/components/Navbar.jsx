import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import ChatBox from "./ChatBox";
import SendMessage from "./SendMessage";

const Navbar = () => {
  const { currentUser, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error loggin out:", error);
    }
  };

  const navigateDashboard = () => {
    navigate("/dashboard");
  };

  const navigateProject = () => {
    navigate("/project");
  };

  const navigateTeam = () => {
    navigate("/team");
  };

  const navigateProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="navbar z-50 bg-base-100">
      {currentUser ? (
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content absolute z-[1] mt-3 p-2 shadow-2xl bg-base-200 rounded-box w-52"
            >
              <li>
                <button onClick={navigateDashboard}>Dashboard</button>
              </li>
              <li>
                <button onClick={navigateProject}>Project</button>
              </li>
              <li>
                <button onClick={navigateTeam}>Team</button>
              </li>
              <li>
                <button onClick={navigateProfile}>Profile</button>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
      <div className="navbar flex justify-center">
        <button
          onClick={navigateDashboard}
          className="btn btn-ghost normal-case text-xl"
        >
          Project Management
        </button>
      </div>
      {currentUser ? (
        <div className="navbar-end">

          <button className="px-2">
            <div className="drawer drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button btn btn-primary"
                >
                  Chat
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu absolute p-4 w-80 h-full bg-base-200 text-base-content">
                  <div className="absolute inset-x bottom-2">
                    <ChatBox />
                    <SendMessage />
                  </div>
                </ul>
              </div>
            </div>
          </button>
          <button onClick={handleLogout} className="btn btn-warning">
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
