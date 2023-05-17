import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./profile.png";
import swal from "@sweetalert/with-react";
import axios from "axios";
import logo from "../Images/ppay-logo.png";
//import "./Header.css";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);


export default function Header() {
  let Merchant = "";
  const userDetails = sessionStorage.getItem("setToken");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const isAuth = sessionStorage.getItem("isAuth");
    if (isAuth) {
      const user = sessionStorage.getItem("setDetails");
      setUser(JSON.parse(user));
      setAuth(true);
      setLoading(false);
      console.log(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    setUser({});
    setAuth(false);
    sessionStorage.removeItem("setDetails");
    sessionStorage.removeItem("setToken");
    sessionStorage.setItem("isAuth", false);
  };

  const handleClick1 = () => 
    axios
      .get("http://localhost:8082/api/user/getUser", {
        headers: { Authorization: `Bearer ${userDetails}` },
      })
      .then((res) => {
        console.log(res);
        if (
          res.data.merchantType !== "TRANSFER" &&
          res.data.merchantType === "ENT"
        ) {
          Merchant = "Merchant Type: ENTERTAINMENT";
        }
        if (
          res.data.merchantType !== "TRANSFER" &&
          res.data.merchantType === "FB"
        ) {
          Merchant = "Merchant Type: FOOD AND BEVERAGES";
        }
        if (
          res.data.merchantType !== "TRANSFER" &&
          res.data.merchantType === "GS"
        ) {
          Merchant = "Merchant Type: GROCERY STORE";
        }
        if (
          res.data.merchantType !== "TRANSFER" &&
          res.data.merchantType === "HF"
        ) {
          Merchant = "HEALTH AND FITNESS";
        }
        if (
          res.data.merchantType !== "TRANSFER" &&
          res.data.merchantType === "OTH"
        ) {
          Merchant = "Merchant Type: OTHER";
        }
        swal(
          <div>
            <h3>Details</h3>
            <p>
              Name: {res.data.firstName} {res.data.lastName}
            </p>
            <p>Balance: {res.data.balance}</p>
            <p>Mobile Number: {res.data.mobile}</p>
            <p>Role: {res.data.role}</p>
            <p>{Merchant}</p>
          </div>
        );
      })
      .catch((err) => {
        console.log("Error:", err);
        swal({
          text: err.response.data,
          icon: "warning",
        });
      });
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4 bg-gradient-to-r from-blue-600">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </Link>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Add Money", "Bank", "Balance", "Expense Analytics"].map(
          (item, index) => (
            <NavBarItem key={item + index} title={item} />
          )
        )}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
    </nav>

    // <nav className="navbar navbar-expand-lg bg-primary">
    //   <div className="container-fluid mx-5">
    //     <Link className="navbar-brand" to="/" style={{ color: "orange" }}>
    //       <h2>Ppay</h2>
    //     </Link>
    //     <Link
    //       className="nav-link dropdown-toggle text-light mx-3"
    //       href="#"
    //       id="navbarDropdown"
    //       role="button"
    //       data-bs-toggle="dropdown"
    //       aria-expanded="false"
    //     >
    //       Services
    //     </Link>
    //     <ul className="nav-item dropdown">
    //       <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
    //         <li>
    //           <Link to="/PayNow" className="dropdown-item">
    //             Pay Now
    //           </Link>
    //         </li>
    //         <li>
    //           <hr className="dropdown-divider" />
    //         </li>
    //         <li>
    //           <Link className="dropdown-item" to="/AddMoney">
    //             Add Money
    //           </Link>
    //         </li>
    //         <li>
    //           <hr className="dropdown-divider" />
    //         </li>
    //         <li>
    //           <Link className="dropdown-item" to="/Bank">
    //             Bank
    //           </Link>
    //         </li>
    //         <li>
    //           <hr className="dropdown-divider" />
    //         </li>
    //         <li>
    //           <Link className="dropdown-item" to="/Balance">
    //             Balance
    //           </Link>
    //         </li>
    //         <li>
    //           <hr className="dropdown-divider" />
    //         </li>
    //         <li>
    //           <Link className="dropdown-item" to="/ExpenseAnalytics">
    //             Expense Analytics
    //           </Link>
    //         </li>
    //       </ul>
    //     </ul>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarSupportedContent"
    //       aria-controls="navbarSupportedContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

    //       <div id="navbarSupportedContent">
    //         <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
    //         <div className="d-flex">
    //           {auth ? (
    //             <>
    //               <div className="right">
    //                 <h2>
    //                   {!loading &&
    //                     (user !== null ? (
    //                       <img
    //                         className="d-inline-block align-text-top"
    //                         width="40"
    //                         height="44"
    //                         src={Profile}
    //                         onClick={handleClick1}
    //                         alt="#"
    //                       />
    //                     ) : (
    //                       ""
    //                     ))}
    //                   <button
    //                     onClick={handleLogout}
    //                     className="btn btn-primary"
    //                   >
    //                     LogOut
    //                   </button>
    //                 </h2>
    //               </div>
    //             </>
    //           ) : (
    //             <div>
    //               <Link
    //                 to="/LogIn"
    //                 className="nav-link active"
    //                 aria-current="page"
    //                 style={{ color: "white" }}
    //               >
    //                 Log In
    //               </Link>
    //               <Link
    //                 to="/SignUp"
    //                 className="nav-link"
    //                 style={{ color: "white" }}
    //               >
    //                 Sign Up
    //               </Link>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </nav>
  );
}
