import React, { useState } from 'react'
import axios from 'axios';
import { Doughnut } from "react-chartjs-2";
//import "./ExpenseAnalytics.css"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
function ExpenseAnalytics() {

  let user = sessionStorage.getItem("setToken");
  let a = 0;
  const [expense, setExpense] = useState({
    Transfer: "",
    FoodAndBeverages: "",
    Entertainment: "",
    HealthAndFitness: "",
    GroceryStore: "",
    Other: "",
  });

  const [amount, setAmount] = useState({
    MoneySpent: "",
    TransferAmount: "",
    FoodAndBeveragesAmount: "",
    EntertainmentAmount: "",
    HealthAndFitnessAmount: "",
    GroceryStoreAmount: "",
    OtherAmount: "",
  });
const  track = () => {
  axios
    .get("http://localhost:8082/api/user/getExpenseAnalytics", {
      headers: { Authorization: `Bearer ${user}` },
    })
    .then((res) => {
      console.log(res);
      setExpense({
        Transfer: res.data.transfer,
        FoodAndBeverages: res.data.fb,
        Entertainment: res.data.ent,
        HealthAndFitness: res.data.hf,
        GroceryStore: res.data.gs,
        Other: res.data.oth,
      });
      setAmount({
        TransferAmount: res.data.transferAmount,
        FoodAndBeveragesAmount: res.data.fbAmount,
        EntertainmentAmount: res.data.entAmount,
        HealthAndFitnessAmount: res.data.hfAmount,
        GroceryStoreAmount: res.data.gsAmount,
        OtherAmount: res.data.othAmount,
      });
      a = res.data.totalAmountSpent;
      console.log(parseInt(expense.Transfer));
    })
    .catch((err) => {
      console.log(err);
    })

    
}

const plugins = [
  {
    afterDraw: function (chart) {
      var width = chart.width,
        height = chart.height / 2,
        ctx = chart.ctx;
      ctx.restore();
      var fontSize = (height / 160).toFixed(2);
      ctx.font = fontSize + "em sans-serif";
      ctx.textBaseline = "top";
      var text = `Money Spent:${parseInt(a)}`,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height;
      ctx.fillText(text, textX, textY);
      ctx.save();
    },
  },
];



  
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: [
      `Transfer: ${expense.Transfer} ₹`,
      `Food And Beverages: ${expense.FoodAndBeverages} ₹`,
      `Entertainment: ${expense.Entertainment} ₹`,
      `Health And Fitness: ${expense.HealthAndFitness} ₹`,
      `Grocery Store: ${expense.GroceryStore} ₹`,
      `Other: ${expense.Other}`,
    ],
    datasets: [
      {
        label: "Amount",
        data: [
          parseInt(amount.TransferAmount),
          parseInt(amount.FoodAndBeveragesAmount),
          parseInt(amount.EntertainmentAmount),
          parseInt(amount.HealthAndFitnessAmount),
          parseInt(amount.GroceryStoreAmount),
          parseInt(amount.OtherAmount),
        ],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  return (
    <div>
      <h3>Expense Tracker</h3>
      <button onClick={track} className="btn btn-primary btn-xl10">
        Click To Track Your Expense
      </button>
      <Doughnut
        data={data}
        options={{
          aspectRatio: 2.5,
        }}
        plugins={plugins}
      />
    </div>
  );
}

export default ExpenseAnalytics;