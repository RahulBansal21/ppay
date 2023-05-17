import React from 'react'
//import "./SignIn.css";
import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
function SavePassword() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [user, setUser] = useState({
      otp: "",
      newPassword: "",
    });
    const handleChange = (e) => {
      setUser((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      const details = {
        otp: user.otp,
        newPassword: user.newPassword,
      };
      axios
        .post(
          "http://localhost:8082/api/public/savePassword",
          details
        )
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            setLoading(false);
            console.log("Response:", response);
            swal(response.data);
            history.push("/LogIn");
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log("Error:", err);
          swal({
            text: err.response.data,
            icon: "warning",
          });
        });
    };
  return (
    <div className="login">
      <Link to="/">
        <h1>Ppay</h1>
      </Link>

      <div className="login__container">
        <form>
          <h3>Enter OTP:</h3>
          <input
            type="text"
            name="otp"
            onChange={handleChange}
            className="firstname"
          />
          <h3>New Password</h3>
          <input
            type="password"
            name="newPassword"
            onChange={handleChange}
            className="firstname"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="login__signInButton"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SavePassword