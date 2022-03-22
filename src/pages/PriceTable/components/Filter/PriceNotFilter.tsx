import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";

interface Props {
  count: number;
  status: string;
}

export default class PriceNotfFilter extends Component<Props, any> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  render() {
    return (
      <div className={`count ${this.props.status}`}>
        <h4>{this.props.count}</h4>
      </div>
    );
  }
}
