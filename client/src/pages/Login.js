import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { FaUserCircle } from "react-icons/fa";

const Login = (props) => {
  const { username, setUsername, password, setPassword, login } = props;
  return (
    <div className="login-wrapper">
      <div className="login-form">
        <FaUserCircle className="form-avatar" />
        <h1>Login</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => (e.key === "Enter" ? login() : "")}
        />
        <button onClick={login}>Login</button>
        <Link to="/register">Dont have account?</Link>
      </div>
    </div>
  );
};

export default Login;
