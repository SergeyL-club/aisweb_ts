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
      this.context.priceArrays &&
      this.context.priceArrays.orders &&
      this.context.priceArrays.page + 1 <= this.context.priceArrays.maxPage
    ) {
      this.context.socket.emit(
        "set page price",
        this.context.priceArrays.page + 1
      );
    }
  }

  pageDown() {
    if (
      this.context.priceArrays &&
      this.context.priceArrays.orders &&
      this.context.priceArrays.page - 1 > 0
    ) {
      this.context.socket.emit(
        "set page price",
        this.context.priceArrays.page - 1
      );
    }
  }

  render() {
    return (
      <div className="footerPrice">
        <div>
          <button onClick={this.pageDown}>{"<"}</button>
          <h2>
            {this.context.priceArrays ? this.context.priceArrays.page : 1}/
            {this.context.priceArrays ? this.context.priceArrays.maxPage : 1}
          </h2>
          <button onClick={this.pageUp}>{">"}</button>
        </div>
      </div>
    );
  }
}
