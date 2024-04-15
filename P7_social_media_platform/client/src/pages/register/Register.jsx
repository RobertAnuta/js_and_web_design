import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!isPasswordValid(inputs.password)) {
      setErr("Password must be at least 8 characters long");
      return;
    }

    try {
      await axios.post("http://localhost:8800/api/auth/register", inputs);
      window.location.href = "/login";
    } catch (err) {
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleClick}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <span className={`error-message`}>{err && err}</span>
            <button type="submit">Register</button>
          </form>
        </div>
        <div className="left">
          <h1>Groupomania Social Network</h1>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button type="button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
