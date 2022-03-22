import React, { Component } from "react";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";

export interface AcceptEditWallet {
  wallet: string;
  wallet_id: string;
  status: "success";
}

interface IStates {
  isEdit: boolean;
  wallet: string | undefined;
  wallet_id: string | undefined;
}

export default class EditWalletForm extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isEdit: false,
      wallet: undefined,
      wallet_id: undefined,
    };
    this.updateEditWallet = this.updateEditWallet.bind(this);
  }

  updateEditWallet(data: { wallet: string; wallet_id: string }) {
    this.setState({
      wallet_id: data.wallet_id,
      wallet: data.wallet,
      isEdit: true,
    });
    setTimeout(() => this.setState({ isEdit: false }), 5 * 1000);
  }

  componentDidMount() {
    this.context.socket.on("edit wallet", this.updateEditWallet);
  }

  componentWillUnmount() {
    this.context.socket.off("edit wallet", this.updateEditWallet);
  }

  render() {
    return (
      <>
        {this.state.isEdit && this.state.wallet && this.state.wallet_id ? (
          <div
            onClick={() => this.setState({ isEdit: false })}
            className="editWalletFormNotf"
          >
            <h1>Кошелёк {`№${this.state.wallet_id} изменен`}</h1>
            <h2>Реквизиты: {`${this.state.wallet}`}</h2>
          </div>
        ) : null}
      </>
    );
  }
}
