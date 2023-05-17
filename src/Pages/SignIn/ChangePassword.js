import React from 'react'
//import "./SignIn.css"
import axios from "axios";
import swal from "sweetalert";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [user, setUser] = useState({
      mobile: "",
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
        mobile: user.mobile,
      };
      axios
        .post("http://localhost:8082/api/public/resetPassword", details)
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            setLoading(false);
            console.log("Response:", response);
            swal(response.data);
            history.push("/savePassword");
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
          <h3>Enter Mobile Number For OTP Verification</h3>
          <input
            type="text"
            name="mobile"
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

export default ChangePassword






