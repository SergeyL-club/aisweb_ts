import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";

export default class SaleNotf extends Component {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  render() {
    return (
      <>
        {this.context.saleNotf ? (
          <div className={`count ${this.context.saleNotf.status}`}>
            <h4>{this.context.saleNotf.number}</h4>
          </div>
        ) : null}
      </>
    );
  }
}
