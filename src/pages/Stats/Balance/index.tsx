import React, { Component } from "react";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";
import { ReactComponent as History } from "./history.svg";
import { StatusNav } from "../../../context/interfaces";

interface IStates {
  isRub: boolean;
}

export default class Balance extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isRub: true,
    };
  }

  render() {
    return (
      <div className="balance">
        <h2>Баланс</h2>
        {this.context.accountInfo ? (
          <>
            <h1>
              {this.state.isRub
                ? this.context.accountInfo.balance_fiat
                : this.context.accountInfo.balance}
            </h1>
            <h3>
              {this.state.isRub
                ? `${this.context.accountInfo.escrow_now_rub} заморожено`
                : `${this.context.accountInfo.escrow_now_btc} заморожено`}
            </h3>
            <History
              onClick={() => this.context.setNav(StatusNav.history)}
              className={`history ${
                this.context.nav === StatusNav.history ? "active" : ""
              }`}
            />
          </>
        ) : (
          <img className="load" src="/loading.gif" alt="Balance" />
        )}
        <div className="toggleRub">
          <h4
            onClick={() => this.setState({ isRub: true })}
            className={this.state.isRub ? "active" : ""}
          >
            RUB
          </h4>
          <h4
            onClick={() => this.setState({ isRub: false })}
            className={!this.state.isRub ? "active" : ""}
          >
            BTC
          </h4>
        </div>
      </div>
    );
  }
}
