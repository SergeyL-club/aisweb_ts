import React, { Component } from "react";
import Balance from "./Balance";
import CloseOrders from "./CloseOrders";
import "./style.sass";
import Volute from "./Volute";

export default class Stats extends Component {
  render() {
    return (
      <div className="stats">
        <Balance />
        <CloseOrders />
        <Volute />
      </div>
    );
  }
}
