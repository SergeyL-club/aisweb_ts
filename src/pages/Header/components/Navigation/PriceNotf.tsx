import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";

export default class PriceNotf extends Component {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  render() {
    return (
      <>
        {this.context.priceNotf ? (
          <div className={`count ${this.context.priceNotf.status}`}>
            <h4>{this.context.priceNotf.number}</h4>
          </div>
        ) : null}
      </>
    );
  }
}
