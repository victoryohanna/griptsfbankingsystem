import React from "react";
import { Route, Switch } from "react-router-dom";
//import './App.css';
import "./styles/main.css";
import NavBar from "./components/NavBar";
import Customers from "./components/Customers";
import Main from "./components/Main"
import Transfer from "./components/Tranfer"
import MoneyTransferDetails from "./components/MoneyTranferDetails"
import CustomerDetails from "./components/CustomerDetails"

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/customers" component={Customers} />
      <Route exact path="/transfer" component={Transfer} />
      <Route exact path="/transfer/:id" component={MoneyTransferDetails} />
      <Route exact path="/customers/:id" component={CustomerDetails} />
      </Switch>
    </div>
  );
}

export default App;
