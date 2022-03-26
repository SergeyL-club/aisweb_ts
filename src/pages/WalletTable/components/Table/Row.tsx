import React, { Component, createRef } from "react";
import { Wallet } from "../../../../context/interfaces";
import { SocketContext } from "../../../../context/socket.context";
import { prettify, prettifyPhone } from "../../../../functions/prettify";
import CopyComponent from "react-copy-to-clipboard";

interface IProps {
  wallet: Wallet;
  setWallet: (wallet: Wallet) => void;
  openEdit: () => void;
}

interface IStates {
  isMenu: boolean;
  copyRequisites: boolean;
  checked: boolean;
}

export default class Row extends Component<IProps, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  checked: React.RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      isMenu: false,
      copyRequisites: false,
      checked: props.wallet.enable,
    };
    this.updateCheck = this.updateCheck.bind(this);
    this.checked = createRef();
  }

  updateCheck(input: { wallet_status: boolean; wallet_id: number }) {
    if (this.checked.current && this.props.wallet.id === input.wallet_id) {
      this.checked.current.checked = input.wallet_status;
      this.setState({ checked: input.wallet_status });
    }
  }

  componentDidMount() {
    this.context.socket.on("toggle wallet", this.updateCheck);
  }

  componentDidUpdate(props: IProps) {
    if (props.wallet !== this.props.wallet) {
      this.setState({
        isMenu: false,
        copyRequisites: false,
        checked: this.props.wallet.enable,
      });
      if (this.checked.current) {
        this.checked.current.checked = this.props.wallet.enable;
      }
    }
  }

  componentWillUnmount() {
    this.context.socket.off("toggle wallet", this.updateCheck);
  }

  render() {
    return (
      <>
        <tr>
          <td>
            {this.props.wallet.banned ? (
              <>
                <h2 style={{ color: "#D65353" }}>Заблокирована</h2>
              </>
            ) : (
              <input
                onClick={() =>
                  this.context.socket.emit("toggle wallet", {
                    wallet_id: this.props.wallet.id,
                  })
                }
                style={{ cursor: "pointer" }}
                type="checkbox"
                ref={this.checked}
                defaultChecked={this.state.checked}
              />
            )}
          </td>
          <td>
            <CopyComponent
              onCopy={() => {
                this.setState({ copyRequisites: true });
                setTimeout(
                  () => this.setState({ copyRequisites: false }),
                  1 * 1000
                );
              }}
              text={this.props.wallet.number}
            >
              <h2
                style={{ cursor: "pointer" }}
                className={`number ${this.state.checked ? "active" : ""}`}
              >
                {this.props.wallet.number[0] === "+"
                  ? prettifyPhone(this.props.wallet.number)
                  : prettify(Number(this.props.wallet.number), 4)}
              </h2>
            </CopyComponent>
            {this.state.copyRequisites ? (
              <span className="copy">Скопировано</span>
            ) : null}
            <h2>{this.props.wallet.description}</h2>
          </td>
          <td>{this.props.wallet.info.order_count_today}</td>
          <td>
            <h2>{prettify(this.props.wallet.info.sum_finished, 3)}</h2>
            <h2>RUB</h2>
          </td>
          <td>
            <h2>{prettify(this.props.wallet.info.sum_escrow, 3)}</h2>
            <h2>RUB</h2>
          </td>
          <td>
            <h2>{prettify(this.props.wallet.info.sum_all, 3)}</h2>
            <h2>RUB</h2>
          </td>
          <td>
            <h2>{prettify(this.props.wallet.limit, 3)}</h2>
            <h2>RUB</h2>
          </td>
          <td>
            <button
              onClick={() => this.setState({ isMenu: !this.state.isMenu })}
              className="menuAnswers"
            >
              Действие
            </button>

            {this.state.isMenu ? (
              <div className="menuAnswers">
                <div>
                  <h2
                    onClick={() => {
                      this.props.setWallet(this.props.wallet);
                      this.props.openEdit();
                      this.setState({ isMenu: false });
                    }}
                    className="editWalletButton"
                  >
                    Изменить
                  </h2>
                </div>
                <div>
                  <h2
                    onClick={() => {
                      this.context.socket.emit("refresh wallet", {
                        wallet_id: this.props.wallet.number,
                      });
                      this.setState({ isMenu: false });
                    }}
                    className="refreshWalletButton"
                  >
                    Обнулить
                  </h2>
                </div>
                <div>
                  <h2
                    className="deleteWalletButton"
                    onClick={() => {
                      this.context.socket.emit("delete wallet", {
                        wallet_id: this.props.wallet.id,
                        wallet: this.props.wallet.number,
                      });
                      this.setState({ isMenu: false });
                    }}
                  >
                    Удалить
                  </h2>
                </div>
              </div>
            ) : null}
          </td>
        </tr>
      </>
    );
  }
}
