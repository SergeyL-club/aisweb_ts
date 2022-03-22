import React, { Component, createRef } from "react";
import { Wallet } from "../../context/interfaces";
import { SocketContext } from "../../context/socket.context";
import "./style.sass";

interface IProps {
  close: () => void;
  wallet?: Wallet;
}

interface IStates {
  preInputMaxLimit: string;
  preInputLimit: string;
  isMaxLimit: boolean;
  isAutoCancel: boolean;
}

export default class WalletForm extends Component<IProps, IStates> {
  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;
  inputMaxLimit: React.RefObject<HTMLInputElement>;
  inputWallet: React.RefObject<HTMLInputElement>;
  textDesc: React.RefObject<HTMLTextAreaElement>;

  constructor(props: IProps) {
    super(props);
    if (props.wallet) {
      this.state = {
        preInputLimit: String(props.wallet.limit),
        isMaxLimit: props.wallet.quantity_limit,
        preInputMaxLimit: String(props.wallet.quantity_limit_amount),
        isAutoCancel: props.wallet.autonumber_off,
      };
    } else {
      this.state = {
        preInputLimit: "0",
        isMaxLimit: false,
        isAutoCancel: false,
        preInputMaxLimit: "0",
      };
    }
    this.inputMaxLimit = createRef();
    this.inputWallet = createRef();
    this.textDesc = createRef();
  }

  componentDidUpdate(props: IProps, state: IStates) {
    if (
      state.isMaxLimit !== this.state.isMaxLimit &&
      state.isMaxLimit &&
      this.inputMaxLimit.current
    ) {
      this.setState({ preInputMaxLimit: "0" });
      this.inputMaxLimit.current.value = "0";
    }
  }

  checkingNumber(el: React.ChangeEvent<HTMLInputElement>) {
    let value = el.currentTarget.value;
    let name = el.currentTarget.name;

    if (value.trim() === "") {
      if (name === "limit") {
        this.setState({ preInputLimit: "0" });
      } else if (name === "maxLimitR") {
        this.setState({ preInputMaxLimit: "0" });
      }
      el.currentTarget.value = "0";
    } else if (
      /[0-9]/.test(value[value.length - 1]) &&
      value[0] === "0" &&
      value.length === 2
    ) {
      if (name === "limit") {
        this.setState({ preInputLimit: value[value.length - 1] });
      } else if (name === "maxLimitR") {
        this.setState({ preInputMaxLimit: value[value.length - 1] });
      }
      el.currentTarget.value = value[value.length - 1];
    } else if (!isNaN(Number(value))) {
      if (name === "limit") {
        this.setState({ preInputLimit: value });
      } else if (name === "maxLimitR") {
        this.setState({ preInputMaxLimit: value });
      }
      el.currentTarget.value = value;
    } else {
      if (name === "limit") {
        el.currentTarget.value = this.state.preInputLimit;
      } else if (name === "maxLimitR") {
        el.currentTarget.value = this.state.preInputMaxLimit;
      }
    }
  }

  send() {
    if (
      this.props.wallet &&
      this.inputWallet.current &&
      this.textDesc.current
    ) {
      this.context.socket.emit("edit wallet", {
        wallet_id: this.props.wallet.id,
        wallet: this.inputWallet.current.value.trim(),
        limit: Number(this.state.preInputLimit),
        description: this.textDesc.current.value.trim(),
        autonumber_off: this.state.isAutoCancel,
        notify_off: false,
        quantity_limit: this.state.isMaxLimit,
        quantity_limit_amount: Number(this.state.preInputMaxLimit),
      });
    } else if (this.inputWallet.current && this.textDesc.current) {
      this.context.socket.emit("add wallet", {
        wallet: this.inputWallet.current.value.trim(),
        limit: this.state.preInputLimit,
        description: this.textDesc.current.value.trim(),
        autonumber_off: this.state.isAutoCancel,
        notify_off: false,
        quantity_limit: this.state.isMaxLimit,
        quantity_limit_amount: this.state.preInputMaxLimit,
      });
    }
    this.props.close();
  }

  render() {
    return (
      <>
        <div onClick={() => this.props.close()} className="background"></div>
        <div className="walletForm">
          <h1>
            {this.props.wallet
              ? `Изменение кашелька №${this.props.wallet.id}`
              : "Добавление кошелька"}
          </h1>
          <label htmlFor="req">Номер / реквизиты:</label>
          <input
            readOnly={typeof this.props.wallet !== "undefined"}
            ref={this.inputWallet}
            defaultValue={this.props.wallet ? this.props.wallet.number : ""}
            type="text"
            name="req"
            id="req"
          />
          <label htmlFor="limit">Лимит, RUB:</label>
          <input
            defaultValue={this.props.wallet ? this.props.wallet.limit : "0"}
            onChange={(el) => this.checkingNumber(el)}
            type="text"
            name="limit"
            id="limit"
          />
          <label htmlFor="">Описание:</label>
          <textarea
            ref={this.textDesc}
            defaultValue={
              this.props.wallet ? this.props.wallet.description : ""
            }
            name="desc"
            id="desc"
          ></textarea>
          <div>
            <label htmlFor="isLimitR">Ограничение по количеству в сутки</label>
            <input
              onClick={() =>
                this.setState({ isMaxLimit: !this.state.isMaxLimit })
              }
              defaultChecked={this.state.isMaxLimit}
              type="checkbox"
              name="isLimitR"
              id="isLimitR"
            />
          </div>
          <label
            className={!this.state.isMaxLimit ? "off" : ""}
            htmlFor="maxLimitR"
          >
            Максимум пополнений в сутки:
          </label>
          <input
            ref={this.inputMaxLimit}
            readOnly={!this.state.isMaxLimit}
            className={!this.state.isMaxLimit ? "off" : ""}
            defaultValue="0"
            onChange={(el) => this.checkingNumber(el)}
            type="text"
            name="maxLimitR"
            id="maxLimitR"
          />
          <div>
            <label htmlFor="isAutoCloseLimit">
              Автовыключение по достижении лимита
            </label>
            <input
              defaultChecked={this.state.isAutoCancel}
              onClick={() =>
                this.setState({ isAutoCancel: !this.state.isAutoCancel })
              }
              type="checkbox"
              name="isAutoCloseLimit"
              id="isAutoCloseLimit"
            />
          </div>
          <div className="buttons">
            <button onClick={() => this.props.close()}>Отмена</button>
            <button onClick={() => this.send()}>Принять</button>
          </div>
        </div>
      </>
    );
  }
}
