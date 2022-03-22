import React, { Component } from "react";
import WalletForm from "../../../WalletForm";
import "./style.sass";

interface IStates {
  isCreateWallet: boolean;
}
export default class Filter extends Component<any, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      isCreateWallet: false,
    };
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ isCreateWallet: false });
  }

  render() {
    return (
      <>
        {this.state.isCreateWallet ? <WalletForm close={this.close} /> : null}
        <div className="filterWallet">
          <div className="menuFilter">
            <div>
              <h2 onClick={() => this.setState({ isCreateWallet: true })}>
                Добавить кошелек
              </h2>
            </div>
          </div>
          <div className="menuSearch"></div>
        </div>
      </>
    );
  }
}
