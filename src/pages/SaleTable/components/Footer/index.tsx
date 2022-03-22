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
      this.context.saleArrays &&
      this.context.saleArrays.orders &&
      this.context.saleArrays.page + 1 <= this.context.saleArrays.maxPage
    ) {
      this.context.socket.emit(
        "set page sale",
        this.context.saleArrays.page + 1
      );
    }
  }

  pageDown() {
    if (
      this.context.saleArrays &&
      this.context.saleArrays.orders &&
      this.context.saleArrays.page - 1 > 0
    ) {
      this.context.socket.emit(
        "set page sale",
        this.context.saleArrays.page - 1
      );
    }
  }

  render() {
    return (
      <div className="footerSale">
        <div>
          <button onClick={this.pageDown}>{"<"}</button>
          <h2>
            {this.context.saleArrays ? this.context.saleArrays.page : 1}/
            {this.context.saleArrays ? this.context.saleArrays.maxPage : 1}
          </h2>
          <button onClick={this.pageUp}>{">"}</button>
        </div>
      </div>
    );
  }
}
