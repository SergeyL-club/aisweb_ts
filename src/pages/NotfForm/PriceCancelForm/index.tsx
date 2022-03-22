import React, { Component } from "react";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";

export interface AcceptPaidOrder {
  exchange_id: string;
  status: "success";
}

interface IStates {
  isCancelPrice: boolean;
  exchange_id: string | undefined;
}

export default class PriceCancelForm extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isCancelPrice: false,
      exchange_id: undefined,
    };
    this.updateAcceptPrice = this.updateAcceptPrice.bind(this);
  }

  updateAcceptPrice(data: string) {
    this.setState({ exchange_id: data, isCancelPrice: true });
    setTimeout(() => this.setState({ isCancelPrice: false }), 5 * 1000);
  }

  componentDidMount() {
    this.context.socket.on(
      "cancel translation price order",
      this.updateAcceptPrice
    );
  }

  componentWillUnmount() {
    this.context.socket.off(
      "cancel translation price order",
      this.updateAcceptPrice
    );
  }

  render() {
    return (
      <>
        {this.state.isCancelPrice && this.state.exchange_id ? (
          <div
            onClick={() => this.setState({ isCancelPrice: false })}
            className="cancelFormNotf"
          >
            <h1>Заявка {`${this.state.exchange_id} отменена`}</h1>
          </div>
        ) : null}
      </>
    );
  }
}
