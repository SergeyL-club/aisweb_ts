import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";
import WalletForm from "../../../WalletForm";
import "./style.sass";

interface IStates {
  isCreateWallet: boolean;
  isFilter: boolean;
  inputReqValue: string;
  inputDescValue: string;
}
export default class Filter extends Component<any, IStates> {
  reqRef: React.RefObject<HTMLInputElement>;
  descRef: React.RefObject<HTMLInputElement>;

  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isCreateWallet: false,
      isFilter: false,
      inputReqValue: "",
      inputDescValue: "",
    };
    this.reqRef = React.createRef();
    this.descRef = React.createRef();
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ isCreateWallet: false });
  }

  setFilter() {
    if (this.reqRef.current && this.descRef.current) {
      this.setState({
        inputReqValue: this.reqRef.current.value.trim(),
        inputDescValue: this.descRef.current.value.trim(),
      });
      this.context.socket.emit("set filter add wallet", {
        requisities: this.reqRef.current.value.trim(),
        description: this.descRef.current.value.trim(),
      });
      this.setState({ isFilter: false });
    }
  }

  setClearFilter() {
    if (this.reqRef.current && this.descRef.current) {
      this.reqRef.current.value = "";
      this.descRef.current.value = "";
      this.setState({
        inputReqValue: this.reqRef.current.value.trim(),
        inputDescValue: this.descRef.current.value.trim(),
      });
      this.context.socket.emit("set filter add wallet", {
        requisities: "",
        description: "",
      });
      this.setState({ isFilter: false });
    }
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
          <div className="menuSearch">
            <div>
              <h2
                style={{ paddingRight: "20px" }}
                onClick={() => {
                  this.setState({ isFilter: !this.state.isFilter });
                }}
              >
                Фильтер
              </h2>
              {this.state.isFilter ? (
                <div className="filterWalletForm">
                  <label htmlFor="req">Реквизиты:</label>
                  <input
                    defaultValue={this.state.inputReqValue}
                    ref={this.reqRef}
                    type="text"
                    name="req"
                    id="req"
                  />
                  <label htmlFor="desc">Описание:</label>
                  <input
                    defaultValue={this.state.inputDescValue}
                    ref={this.descRef}
                    type="text"
                    name="desc"
                    id="desc"
                  />
                  <div>
                    <button onClick={() => this.setClearFilter()}>
                      Очистить
                    </button>
                    <button onClick={() => this.setFilter()}>Применить</button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  }
}
