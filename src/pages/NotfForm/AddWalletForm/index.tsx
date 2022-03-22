import React, { Component } from "react";
import { SocketContext } from "../../../context/socket.context";
import "./style.sass";

export interface AcceptAddWallet {
  wallet: string;
  status: "success";
}

interface IStates {
  isAdd: boolean;
  wallet: string | undefined;
}

export default class AddWalletForm extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isAdd: false,
      wallet: undefined,
    };
    this.updateAddWallet = this.updateAddWallet.bind(this);
  }

  updateAddWallet(data: { wallet: string }) {
    this.setState({ wallet: data.wallet, isAdd: true });
    setTimeout(() => this.setState({ isAdd: false }), 5 * 1000);
  }

  componentDidMount() {
    this.context.socket.on("add wallet", this.updateAddWallet);
  }

  componentWillUnmount() {
    this.context.socket.off("add wallet", this.updateAddWallet);
  }

  render() {
    return (
      <>
        {this.state.isAdd && this.state.wallet ? (
          <div
            onClick={() => this.setState({ isAdd: false })}
            className="addWalletFormNotf"
          >
            <h1>Кошелёк {`${this.state.wallet} создан`}</h1>
          </div>
        ) : null}
      </>
    );
  }
}
