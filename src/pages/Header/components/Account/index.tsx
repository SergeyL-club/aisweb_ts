import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";
import "./style.sass";

export default class Account extends Component {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  exit() {
    this.context.socket.disconnect();
    localStorage.removeItem("token");
    this.context.setIsSave(false);
    this.context.setIsAuth(false);
  }

  render() {
    return (
      <div className="account">
        {this.context.accountInfo ? (
          <h1 onClick={() => this.exit()}>
            {this.context.accountInfo.direction
              .toLocaleUpperCase()
              .slice(0, 1) +
              this.context.accountInfo.direction
                .toLocaleLowerCase()
                .slice(1, this.context.accountInfo.direction.length)}{" "}
            {this.context.accountInfo.alias
              ? `(${this.context.accountInfo.alias})`
              : ""}
          </h1>
        ) : (
          <img className="loadAccount" src="/loading.gif" alt="Logo" />
        )}
      </div>
    );
  }
}
