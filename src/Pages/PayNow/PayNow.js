import React, {useState} from 'react'
import axios from 'axios';
import swal from "sweetalert";
//import './PayNow.css'
import { Link } from 'react-router-dom';

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

export default function PayNow() {
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState({
    amountError: "",
    ridError: "",
  });
  const [data, setData] = useState({
    rid: "",
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
    let ridError = "";
    let amountError = "";

    if (data.amount.trim().length === 0) {
      amountError = "* Amount is required";
    }
    if (data.rid.trim().length === 0) {
      ridError = "*Mobile Number is required";
    }

    if (amountError || ridError) {
      setCredential({
        amountError,
        ridError,
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
        rid: data.rid,
      };

      console.log(user);
      axios
        .post("http://localhost:8082/api/user/sendMoney", details, {
          headers: { Authorization: `Bearer ${user}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setData({
              rid: "",
              amount: "",
            });
            console.log("Response:", response);
            swal({
              title: "Good job!",
              text: "Payment Successfull",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          //setRep(err.response.data);
          console.log("Error:", err);
          swal({
            text: err.response.data,
            icon: "warning",
          });
        });
      e.preventDefault();
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <div className="mf:mt-0 mt-10 p-5 sm:w-96 flex flex-col flex-1 md:p-20 py-12 px-4 justify-start items-center h-full w-full bg-blue-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-120 border border-gray-100">
            <Input placeholder="Address To" name="addressTo" type="text" />
            <Input placeholder="Amount (ETH)" name="amount" type="number" />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" />
            <Input placeholder="Enter Message" name="message" type="text" />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            <button
              type="button"
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            >
              Send Now
            </button>
          </div>
        </div>
      </div>
    </div>

    //  <div className="paynow">
    //     <Link to="/">
    //       <h1>Ppay</h1>
    //     </Link>
    //     <div className="paynow__container">
    //       <h1>Pay Now</h1>
    //       <form>
    //         <h3>Mobile Number</h3>
    //         <input type="text" name="rid" onChange={handleChange} />
    //         <p style={{ color: "red" }}>{credential.ridError}</p>
    //         <h3>Amount</h3>
    //         <input type="text" name="amount" onChange={handleChange} />
    //         <p style={{ color: "red" }}>{credential.amountError}</p>
    //         <button
    //           type="submit"
    //           className="paynow__signInButton"
    //           onClick={submitDetails}
    //           disabled={loading}
    //         >
    //           {loading ? "Loading..." : "Pay Now"}
    //         </button>
    //       </form>
    //     </div>
    //   </div>
  );
}
