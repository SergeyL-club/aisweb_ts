import React, { Component } from "react";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";

export default class Volute extends Component {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  render() {
    return (
      <div className="volute">
        <h2>Обороты</h2>
        {this.context.accountInfo ? (
          <>
            <h1>{this.context.accountInfo.received_fiat}</h1>
            <h3>+ {this.context.accountInfo.received_fiat_today} за сегодня</h3>
          </>
        ) : (
          <img className="load" src="/loading.gif" alt="Logo" />
        )}
      </div>
    );
  }
}
