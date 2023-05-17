import React, { useState } from 'react'
//import "./Bank.css"
import swal from "@sweetalert/with-react";
import axios from "axios"
import moment from "moment";
function Bank() {
    const [arr, setArr] = useState([]);
    const user = sessionStorage.getItem("setToken");
    const [input, setInput] = useState({newPin: ""});
    const handleChange = (e) => {
      setInput((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
    const handleClick = () =>
      axios
        .post("http://localhost:8082/api/user/createBankAccount", "", {
          headers: { Authorization: `Bearer ${user}` },
        })
        .then((res) => {
          console.log(res);
          swal({
            title: "Good job!",
            text: res.data,
            icon: "success",
          });
        })
        .catch((err) => {
          //setRep(err.response.data);
          console.log("Error:", err);
          swal({
            text: err.response.data,
            icon: "warning",
          });
        });
    
const handleClick1 = () =>
  axios
    .get("http://localhost:8082/api/user/getBankDetails", {
      headers: { Authorization: `Bearer ${user}` },
    })
    .then((res) => {
      console.log(res);
      swal(
        <div>
          <h3>Bank Details</h3>
          <p>Account No: {res.data.accountNo}</p>
          <p>
            Customer Name: {res.data.firstName} {res.data.lastName}
          </p>
          <p>IFSC Code: {res.data.ifscCode}</p>
          <p>Account Type: {res.data.accountType}</p>
          <p>Mobile Number: {res.data.mobile}</p>
          <p>Balance: {res.data.balance}</p>
        </div>
      );
    })
    .catch((err) => {
      //setRep(err.response.data);
      console.log("Error:", err);
      swal({
        text: err.response.data,
        icon: "warning",
      });
    });
    const handleClick2 = () =>{
      const details = {
        newPin: input.newPin,
      };
      axios
        .post("http://localhost:8082/api/user/setPin", details, {
          headers: { Authorization: `Bearer ${user}` },
        })
        .then((res) => {
          console.log(res);
          console.log(input.newPin);
          swal({
            title: "Good job!",
            text: res.data,
            icon: "success",
          });
        })
        .catch((err) => {
          //setRep(err.response.data);
          console.log("Error:", err);
          swal({
            text: err.response.data,
            icon: "warning",
          });
        });
    };
    const txn = () => {
      axios
        .get(
          "http://localhost:8082/api/user/bankTransactionHistory/getBankTxnHistory",
          {
            headers: { Authorization: `Bearer ${user}` },
          }
        )
        .then((res) => {
          console.log(res.data);
          setArr(res.data);
        });
    };
  return (
    <div>
      <h1 className="ppb">Ppay Payments Bank</h1>
      <div className="bank">
        <button onClick={handleClick} className="btn btn-primary btn-xl">
          Create Bank Account
        </button>
        <button onClick={handleClick1} className="btn btn-primary btn-xl">
          Get Details
        </button>
        <br></br>
      </div>
      <div className="bankinput">
        <h5>Enter PIN:</h5>
        <input
          type="text"
          name="newPin"
          onChange={handleChange}
          className="pin"
        />
        <br></br>
      </div>

      <div className="bank">
        <button onClick={handleClick2} className="btn btn-primary btn-xl">
          Set Pin
        </button>
        <button onClick={txn} className="btn btn-primary btn-xl">
          Click To See Transaction History
        </button>
      </div>

      <table>
        <thead>
          {arr.length > 0 && (
            <tr>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Date</th>
              <th>UpdatedBalance</th>
              <th>Amount</th>
              <th>Transaction Type</th>
            </tr>
          )}
        </thead>
        <tbody>
          {arr.length > 0 &&
            arr.map((item, index) => (
              <tr>
                <td>{item.sid}</td>
                <td>{item.rid}</td>
                <td>{moment(item.date).format("MMM Do YYYY, h:mm A")}</td>
                <td>{item.updatedBalance}</td>
                <td>
                  {item.add}
                  {item.amount}
                </td>
                <td>{item.transactionType}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bank