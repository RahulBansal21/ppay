import React from "react";
import axios from "axios";
//import "./SignIn.css";
import swal from "sweetalert";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const Otp = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState({
    otp: "",
    mobile: localStorage.getItem("mobile"),
  });

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault();
    axios
      .get("http://localhost:8082/api/public/verifyRegistration", {
        params: {
          otp: user.otp,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setLoading(false);
          console.log("Response:", response);
          swal(response.data);
          history.push("/LogIn");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error:", err);
        swal(err.response.data);
      });
  };

  const handleResend = (e) => {
    e.preventDefault();
    axios
      .get("http://localhost:8082/api/public/resendVerifyOtp", {
        params: {
          mobile: user.mobile,
        },
      })
      .then((response) => {
        if (response.status === 201 || response.status === 200) {
          console.log("Response:", response);
          swal({
            title: "Good job!",
            text: response.data,
            icon: "success",
          });
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        swal({
          text: err.response.data,
          icon: "warning",
        });
      });
  };

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="login">
      <Link to="/">
        <h3>Ppay</h3>
      </Link>
      <div className="login__container">
        <h1>Register</h1>
        <form>
          <h5>Enter OTP:</h5>
          <input
            type="text" 
            name="otp"
            className="firstname"
            onChange={handleChange}
          />
          <button
            className="login__signInButton"
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Verify"}
          </button>

          <h5 style={{ margin: "15px", color:"blue"}} onClick={handleResend}>
            {" "}
            Resend OTP{" "}
          </h5>
        </form>
      </div>
    </div>
  );
};

export default Otp;
