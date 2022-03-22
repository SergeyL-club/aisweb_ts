import React, { Component } from "react";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";

interface IStates {
  isToggleWalet: boolean;
  wallet_status: boolean | undefined;
  wallet_id: string;
}

export default class ToggleWaletForm extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isToggleWalet: false,
      wallet_status: undefined,
      wallet_id: "",
    };
    this.updateAcceptPrice = this.updateAcceptPrice.bind(this);
  }

  updateAcceptPrice(input: { wallet_id: string; wallet_status: boolean }) {
    this.setState({
      wallet_id: input.wallet_id,
      wallet_status: input.wallet_status,
      isToggleWalet: true,
    });
    setTimeout(() => this.setState({ isToggleWalet: false }), 5 * 1000);
  }

  componentDidMount() {
    this.context.socket.on("toggle wallet", this.updateAcceptPrice);
  }

  componentWillUnmount() {
    this.context.socket.off("toggle wallet", this.updateAcceptPrice);
  }

  render() {
    return (
      <>
        {this.state.isToggleWalet && this.state.wallet_id ? (
          <div
            onClick={() => this.setState({ isToggleWalet: false })}
            className="toggleWalletFormNotf"
          >
            <h1>Кошелек {`${this.state.wallet_id} был изменен статус`}</h1>
            <h2>
              Статус изменения
              <span className={this.state.wallet_status ? "plus" : "minus"}>
                {this.state.wallet_status ? "Включен" : "Выключен"}
              </span>
            </h2>
          </div>
        ) : null}
      </>
    );
  }
}
