import React, {useState} from 'react'
import axios from 'axios';
import swal from "sweetalert";
import { Link } from 'react-router-dom';
//import "./SendMoneyToBank.css";
function SendMoneyToBank() {
    const [loading, setLoading] = useState(false);
    const [credential, setCredential] = useState({
    amountError: "",
  });
  const [data, setData] = useState({
    amount: "",
  });

  let user = (sessionStorage.getItem("setToken"));



  const handleChange = (e) => {
    //console.log(inputs);
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    //console.log(inputs.sid);
    //console.log(inputs.rid);
    //console.log(inputs.amount);
  };

  const payNowValidate = () => {
    let amountError = "";

    if (data.amount.trim().length === 0) {
      amountError = "* Amount is required";
    }

    if (amountError) {
      setCredential({
        amountError,
      });
      return false;
    }
    return true;
  };

  const submitDetails = (e) => {
    setLoading(true);
    //e.preventDefault();
    if(payNowValidate()){
      const details = {
        amount: data.amount,
      };

      console.log(user);
      axios
        .post("http://localhost:8082/api/user/sendMoneyToBank", details, {
          headers: { Authorization: `Bearer ${user}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setData({
              amount: "",
            });
            console.log("Response:", response);
            swal("Payment Successfull");
            //history.push("/otp");
            //alert(inputs.firstName);
          }
        })
        .catch((err) => {
          setLoading(false);
          //setRep(err.response.data);
          console.log("Error:", err);
          swal(err.response.data);
        });
      e.preventDefault();
    }
  };
  return (
    <div>
      <div className="center">
        <Link to="/">
          <h1>Ppay</h1>
        </Link>
        <h1>Pay Now</h1>
        <form>
          <h3>Amount</h3>
          <input
            type="text"
            //placeholder="Enter Amount"
            name="amount"
            onChange={handleChange}
          />
          <h3>{credential.amountError}</h3>
          <button
            type="submit"
            className="paynow__signInButton"
            onClick={submitDetails}
            disabled={loading}
          >
            {loading ? "Loading..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SendMoneyToBank