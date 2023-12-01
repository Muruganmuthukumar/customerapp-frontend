import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../redux/auth/authSlice";
import { useDispatch } from "react-redux";
import "../Styles/SignIn.css";
import { toast } from "react-toastify";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "admin",
    password: "admin",
  });
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    setServerErr('')
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/admin/login`, formData)
      .then((res) => {
        // console.log(res.data);
        setLoading(false)
        dispatch(isAuthenticated(true));
        toast.success(res.data, {
          position: toast.POSITION.BOTTOM_RIGHT,
          pauseOnHover: false,
        });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false)
        setServerErr(err.response.data)
        // console.log(err.response.data);
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  return (
    <>
      <section className="signin-container">
        <form onSubmit={handleSubmit}>
          <h1>Admin Dashboard</h1>
          <div className="input-container">
            <input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              autoComplete="none"
              placeholder=""
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              placeholder=""
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <small style={{
            color: "red", fontWeight: "600",
          marginTop:"15px"}}>{serverErr}</small>
          <button>{loading?"Loading...":"Sign In" }</button>
        </form>
      </section>
    </>
  );
};

export default SignIn;
