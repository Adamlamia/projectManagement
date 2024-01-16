import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, signinWithGoogle, signinWithEmailPassword, signupWithEmailPassword } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signinWithGoogle();
    } catch (error) {
      console.error("Error handle login:", error);
    }
  }

  const handleEmailLogin = async () => {
    try {
      await signinWithEmailPassword(email, password);
    } catch (error) {
      console.error("Error handle email login:", error);
    }
  }

  const handleSignup = async () => {
    try {
      await signupWithEmailPassword(email, password);
    } catch (error) {
      console.error("Error handle signup:", error);
    }
  }

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Login Page</h1>
          <p className="py-6">
            Join the Project Management tools for Students, Teachers, and Supervisors.
          </p>
          <button onClick={handleLogin} className="btn btn-primary">
            Login With Google
          </button>
          <div className="py-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered mt-2"
            />
            <button onClick={handleEmailLogin} className="btn btn-primary mt-2">
              Login With Email and Password
            </button>
            <button onClick={handleSignup} className="btn btn-primary mt-2">
              Sign Up new Email and Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
