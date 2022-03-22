import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";
import { Wallet } from "../../../../context/interfaces";
import Row from "./Row";
import "./style.sass";
import WalletForm from "../../../WalletForm";

interface IStates {
  isEdit: boolean;
  walletEdit: Wallet | undefined;
}
export default class Table extends Component<any, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isEdit: false,
      walletEdit: undefined,
    };

    this.closeEdit = this.closeEdit.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.setWallet = this.setWallet.bind(this);
  }

  closeEdit() {
    this.setState({ isEdit: false });
  }
  openEdit() {
    this.setState({ isEdit: true });
  }
  setWallet(wallet: Wallet) {
    this.setState({ walletEdit: wallet });
  }

  render() {
    return (
      <>
        {this.state.isEdit && this.state.walletEdit ? (
          <WalletForm close={this.closeEdit} wallet={this.state.walletEdit} />
        ) : null}
        <table className="walletTable">
          <thead>
            <tr>
              <th>Вкл</th>
              <th>Реквизит</th>
              <th>Сделок сегодня</th>
              <th>Сумма за сегодня</th>
              <th>Сумма по эскроу</th>
              <th>Общая сумма</th>
              <th>Лимит</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {this.context.walletArray && this.context.walletArray.wallets ? (
              this.context.walletArray.wallets.map((wallet, key) => {
                return (
                  <Row
                    setWallet={this.setWallet}
                    openEdit={this.openEdit}
                    key={key}
                    wallet={wallet}
                  />
                );
              })
            ) : (
              <tr>
                <td style={{ position: "relative" }}>
                  <img className="load" src="/loading.gif" alt="Table" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }
}
