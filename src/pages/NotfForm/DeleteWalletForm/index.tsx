import React, { Component } from "react";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";

export interface AcceptDeleteWallet {
  wallet: string;
  wallet_id: string;
  status: "success";
}

interface IStates {
  isDelete: boolean;
  wallet: string | undefined;
  wallet_id: string | undefined;
}

export default class DeleteWalletForm extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isDelete: false,
      wallet: undefined,
      wallet_id: undefined,
    };
    this.updateDeleteWallet = this.updateDeleteWallet.bind(this);
  }

  updateDeleteWallet(data: { wallet: string; wallet_id: string }) {
    this.setState({
      wallet_id: data.wallet_id,
      wallet: data.wallet,
      isDelete: true,
    });
    setTimeout(() => this.setState({ isDelete: false }), 5 * 1000);
  }

  componentDidMount() {
    this.context.socket.on("delete wallet", this.updateDeleteWallet);
  }

  componentWillUnmount() {
    this.context.socket.off("delete wallet", this.updateDeleteWallet);
  }

  render() {
    return (
      <>
        {this.state.isDelete && this.state.wallet && this.state.wallet_id ? (
          <div
            onClick={() => this.setState({ isDelete: false })}
            className="deleteWalletFormNotf"
          >
            <h1>Кошелёк {`№${this.state.wallet_id} удален`}</h1>
            <h2>Реквизиты: {`${this.state.wallet}`}</h2>
          </div>
        ) : null}
      </>
    );
  }
}
