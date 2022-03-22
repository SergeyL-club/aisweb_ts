import React, { Component } from "react";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";

export default class CloseOrders extends Component {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  render() {
    return (
      <div className="closeOrders">
        <h2>Закрытых заявок</h2>
        {this.context.accountInfo ? (
          <>
            <h1>{this.context.accountInfo.closed_orders}</h1>
            <h3>+ {this.context.accountInfo.closed_orders_today} за сегодня</h3>
          </>
        ) : (
          <img className="load" src="/loading.gif" alt="Logo" />
        )}
      </div>
    );
  }
}
