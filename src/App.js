import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AddMoney from './Pages/AddMoney/AddMoney';
import PayNow from './Pages/PayNow/PayNow';
import Balance from './Pages/Balance/Balance';
import Home from './Pages/Home/Home'
import ExpenseAnalytics from './Pages/ExpenseAnalytics/ExpenseAnalytics';
import LogIn from './Pages/SignIn/LogIn';
import SignUp from './Pages/SignIn/SignUp';
import Otp from './Pages/SignIn/Otp';
import Bank from './Pages/Bank/Bank';
import ChangePassword from './Pages/SignIn/ChangePassword';
import SendMoneyToBank from './Pages/SendMoneyToBank/SendMoneyToBank';
import SavePassword from './Pages/SignIn/SavePassword';
export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/savePassword">
            <SavePassword />
          </Route>
          <Route path="/sendMoneyToBank">
            <Header />
            <SendMoneyToBank />
          </Route>
          <Route path="/changePassword">
            <ChangePassword />
          </Route>
          <Route path="/Bank">
            <Header />
            <Bank />
          </Route>
          <Route path="/otp">
            <Otp />
          </Route>
          <Route path="/ExpenseAnalytics">
            <Header />
            <ExpenseAnalytics />
          </Route>
          <Route path="/Balance">
            <Header />
            <Balance />
          </Route>
          <Route path="/SignUp">
            <SignUp />
          </Route>
          <Route path="/LogIn">
            <LogIn />
          </Route>
          <Route path="/AddMoney">
            <Header />
            <AddMoney />
          </Route>
          <Route path="/PayNow">
            <Header />
            <PayNow />
            {/* <Footer /> */}
          </Route>
          <Route path="/">
            <Header />
            <Home />
            {/* <Footer /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

