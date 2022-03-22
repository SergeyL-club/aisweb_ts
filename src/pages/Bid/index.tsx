import React, { Component } from "react";
import { SocketContext } from "../../context/socket.context";
import { prettify } from "../../functions/prettify";
import "./style.sass";

export default class Bid extends Component {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  render() {
    return (
      <div className="bid">
        <h2>{` BTC-RUB: ${prettify(
          this.context.rate,
          3
        )} | Ваша ставка: ${prettify(
          Math.floor((this.context.rate / 100) * (100 + this.context.percent)),
          3
        )} RUB (${this.context.percent}%)`}</h2>
      </div>
    );
  }
}
