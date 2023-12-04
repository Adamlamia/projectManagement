// App.jsx
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import Project from "./pages/Project";
import ProjectDetails from "./components/ProjectDetail";
import TeamDetails from "./components/TeamDetail";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/project"
          element={
            <PrivateRoute>
              <Project />
            </PrivateRoute>
          }
        />
        <Route
          path="/team"
          element={
            <PrivateRoute>
              <Team />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route 
          path="/project/:projectId" 
          element={
            <PrivateRoute>
              <ProjectDetails />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/team/:teamId" 
          element={
            <PrivateRoute>
              <TeamDetails />
            </PrivateRoute>
          } 
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
