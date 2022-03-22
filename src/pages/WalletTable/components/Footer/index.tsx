import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";
import "./style.sass";

export default class Footer extends Component {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.pageDown = this.pageDown.bind(this);
    this.pageUp = this.pageUp.bind(this);
  }
  pageUp() {
    if (
      this.context.walletArray &&
      this.context.walletArray.wallets &&
      this.context.walletArray.page + 1 <= this.context.walletArray.maxPage
    ) {
      this.context.socket.emit(
        "set page wallet",
        this.context.walletArray.page + 1
      );
    }
  }

  pageDown() {
    if (
      this.context.walletArray &&
      this.context.walletArray.wallets &&
      this.context.walletArray.page - 1 > 0
    ) {
      this.context.socket.emit(
        "set page wallet",
        this.context.walletArray.page - 1
      );
    }
  }

  render() {
    return (
      <div className="footerWallet">
        <div>
          <button onClick={this.pageDown}>{"<"}</button>
          <h2>
            {this.context.walletArray ? this.context.walletArray.page : 1}/
            {this.context.walletArray ? this.context.walletArray.maxPage : 1}
          </h2>
          <button onClick={this.pageUp}>{">"}</button>
        </div>
      </div>
    );
  }
}
