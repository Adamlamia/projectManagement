import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";
import ChatBox from "./ChatBox";
import SendMessage from "./SendMessage";

const Navbar = () => {
  const { currentUser, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const navigateDashboard = () => {
    navigate("/dashboard");
  }

  return (
    <div className="navbar bg-base-100　z-auto">
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
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <button onClick={navigateDashboard}>
                  Dashboard
                </button>
              </li>
              <li>
                <a>Project</a>
              </li>
              <li>
                <a>Team</a>
              </li>
              {/* <li>
                <button onClick={handleLogout}>Logout</button>
              </li> */}
            </ul>
          </div>
        </div>
      ) : null}
      <div className="navbar flex justify-center">
        <button onClick={navigateDashboard} className="btn btn-ghost normal-case text-xl">
          Project Management
        </button>
      </div>
      {currentUser ? (
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator z-0">
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
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
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
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
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
