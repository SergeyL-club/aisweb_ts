import React, { Component } from "react";
import { SocketContext } from "../../../context/socket.context";
import { prettify } from "../../../functions/prettify";
import "./style.sass";

interface IStates {
  isRefresh: boolean;
  id: string;
}

export default class RefreshWalletForm extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isRefresh: false,
      id: "",
    };

    this.refreshWallet = this.refreshWallet.bind(this);
  }

  refreshWallet(wallet_id: string) {
    this.setState({
      id: wallet_id,
      isRefresh: true,
    });
    setTimeout(() => this.setState({ isRefresh: false }), 5 * 1000);
  }

  componentDidMount() {
    this.context.socket.on("refresh wallet", this.refreshWallet);
  }

  componentWillUnmount() {
    this.context.socket.off("refresh wallet", this.refreshWallet);
  }

  render() {
    return (
      <>
        {this.state.isRefresh && this.state.id ? (
          <div
            onClick={() => this.setState({ isRefresh: false })}
            className="refreshWalletFormNotf"
          >
            <h1>
              Обнулен кошелек{" "}
              {`${
                this.state.id[0] === "+"
                  ? this.state.id
                  : "№" + prettify(Number(this.state.id), 4)
              }`}
            </h1>
          </div>
        ) : null}
      </>
    );
  }
}
