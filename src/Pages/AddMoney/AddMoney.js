import React, { useState } from "react";
//import "./AddMoney.css";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import axios from "axios";
export default function AddMoney() {
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState({amountError: "", pinError: ""})
  let user = sessionStorage.getItem("setToken");
  const [input, setInput] = useState({amount: "", pin: ""});
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const addMoneyValidate = () => {
    let amountError = "";
    let pinError = "";

    if (input.amount.trim().length === 0) {
      amountError = "* Amount is required";
    }
    if (input.pin.trim().length === 0) {
      pinError = "* PIN is required";
    }

    if (
      amountError ||
      pinError
    ) {
      setCredential({
        amountError,
        pinError,
      });
      return false;
    }
    return true;
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if(addMoneyValidate()){
      const details = {
        amount: input.amount,
        pin: input.pin,
      };
      axios
        .post("http://localhost:8082/api/user/addMoneyFromBank", details, {
          headers: { Authorization: `Bearer ${user}` },
        })
        .then((response) => {
          // return  response;
          if (response.status === 200) {
            setLoading(false);
            console.log("Response:", response);
            swal({
              title: "Good job!",
              text: response.data,
              icon: "success",
            });
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
    }
  }
  return (
    <div className="addmoney">
      <Link to="/" className="link1">
        <h1>Ppay</h1>
      </Link>
      <div className="addmoney__container">
        <h1>Add Money To Wallet</h1>

        <form>
          <h4>Amount</h4>
          <input type="text" name="amount" onChange={handleChange} />
          <p style={{ color: "red" }}>{credential.amountError}</p>
          <h4>PIN</h4>
          <input type="password" name="pin" onChange={handleChange} />
          <p style={{ color: "red" }}>{credential.pinError}</p>
            <button
            type="button"
              className="btn btn-primary mx-4 my-4"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Add Money"}
            </button>
        </form>
      </div>
    </div>
  );
}
