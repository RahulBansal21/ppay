import React, { useState } from 'react'
import {Link} from "react-router-dom"
//import "./Balance.css";
import moment from "moment";
import axios from 'axios';
import swal from '@sweetalert/with-react';
export default function Balance() {
  let user = sessionStorage.getItem("setToken");
  const[display, setDisplay] = useState("");
  const [arr, setArr] = useState([]);
  const [balance, setBalance] = useState(""); 

      axios
        .get("http://localhost:8082/api/user/getBalance", {
          headers: { Authorization: `Bearer ${user}` },
        })
        .then((res) => {
          console.log(res.data);
          setBalance(res.data);
        });
    
    
    const txn = () => {
      
      axios
        .get(
          "http://localhost:8082/api/user/transactionHistory/getTxnHistory",
          {
            headers: { Authorization: `Bearer ${user}` },
          }
        )
        .then((res) => {
          console.log(res.data);
          setArr(res.data);
            
        });
    }; 
    
    const view = () => {
      swal(
        <table>
          <thead>
            {arr.length > 0 && (
              <tr>
                <th>Sender</th>
                <th>Receiver</th>
                {/* <th>Date</th> */}
                <th>Balance</th>
                <th>Amount</th>
                {/* <th>Transaction Type</th> */}
              </tr>
            )}
          </thead>
          <tbody>
            {arr.length > 0 &&
              arr.map((item, index) => (
                <tr>
                  <td>{item.sid}</td>
                  <td>{item.rid}</td>
                  {/* <td>{moment(item.date).format("MMM Do YYYY, h:mm A")}</td> */}
                  <td>{item.updatedBalance}</td>
                  <td>{item.amount}</td>
                  {/* <td>{item.transactionType}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      );
    }


      return (
        <div>
          <Link to="/" className="link1">
            <h1>Ppay</h1>
          </Link>
          <h1>Available Balance</h1>
          <h4>{balance}</h4>
          <button onClick={txn} className="btn btn-primary btn-xl9">
            Click To See Transaction History
          </button>
          <table>
            <thead>
              {arr.length > 0 && (
                <tr>
                  <th>Sender</th>
                  <th>Receiver</th>
                  {/* <th>Date</th> */}
                  <th>Balance</th>
                  <th>Amount</th>
                  {/* <th>Transaction Type</th> */}
                </tr>
              )}
            </thead>
            <tbody>
              {arr.length > 0 &&
                arr.map((item, index) => (
                  <tr>
                    <td>{item.sid}</td>
                    <td>{item.rid}</td>
                    {/* <td>{moment(item.date).format("MMM Do YYYY, h:mm A")}</td> */}
                    <td>{item.updatedBalance}</td>
                    <td>
                      {item.amount}
                    </td>
                    <td><button onClick={view}>View</button></td>
                    {/* <td>{item.transactionType}</td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      );
}


//  http://localhost:8082/api/admin/getBalance/{mobile}