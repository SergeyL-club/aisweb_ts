import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";
import "./style.sass";
import CopyComponent from "react-copy-to-clipboard";

interface IStates {
  isMenu: boolean;
}

export default class Account extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isMenu: false,
    };
  }

  toggleOrder() {
    if (this.context.accountInfo) {
      this.context.socket.emit(
        "toggle order",
        !this.context.accountInfo.deal_enable
      );
    }
  }

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
          <h1 onClick={() => this.setState({ isMenu: !this.state.isMenu })}>
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
        {this.state.isMenu ? (
          <div className="menu">
            <div>
              <CopyComponent
                text={`${
                  this.context.accountInfo
                    ? this.context.accountInfo.depositToken
                    : ""
                }`}
              >
                <h2 onClick={() => this.setState({ isMenu: false })}>
                  Кошелёк для пополнения
                </h2>
              </CopyComponent>
            </div>
            <div>
              <h2
                className={
                  this.context.accountInfo &&
                  this.context.accountInfo.deal_enable
                    ? "green"
                    : "red"
                }
                onClick={() => this.toggleOrder()}
              >
                Сделки{" "}
                {`(${
                  this.context.accountInfo &&
                  this.context.accountInfo.deal_enable
                    ? "ВКЛ"
                    : "ВЫКЛ"
                })`}
              </h2>
            </div>
            <div>
              <h2 onClick={() => this.exit()}>Выход</h2>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
