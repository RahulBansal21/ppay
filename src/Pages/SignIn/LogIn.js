import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
//import "./SignIn.css";
import axios from "axios";
export default function LogIn() {
  const[loading, setLoading] = useState(false);
  let history = useHistory();
  const [data, setData] = useState({ username: "", password: "" });
  const handleChange = (e) => {

    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e) => {
    setLoading(true);
    e.preventDefault();
    const details = {
      username: data.username,
      password: data.password,
    };
    axios
      .post("http://localhost:8082/api/getToken", details)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setData({ username: "", password: "" });
          console.log(response);
          sessionStorage.setItem("setToken", response.data.token);
          console.log(response.data.userDto);
          sessionStorage.setItem(
            "setDetails",
            JSON.stringify(response.data.userDto)
          );
          sessionStorage.setItem("isAuth", true);
          
          history.push("/");
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
    <div>
      <div className="center">
        <Link to="/">
          <h1>Ppay</h1>
        </Link>
        <h1>Log In</h1>

        <form>
          <h4>Mobile Number</h4>
          <input
            type="text"
            className="mobile"
            maxLength={10}
            name="username"
            onChange={handleChange}
          />
          <h4>Password</h4>
          <input
            type="password"
            className="password"
            name="password"
            onChange={handleChange}
          />
          <br></br>
          <button
            className="login__signInButton"
            type="submit"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? "Loading..." : "Log In"}
          </button>
          <Link to="/changePassword">
            <span>Forgot Password?</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
