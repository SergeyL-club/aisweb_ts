import React, { Component } from "react";
import { SocketContext } from "../../../../context/socket.context";
import SaleNotfFilter from "./SaleNotfFilter";
import "./style.sass";

export enum StatusSell {
  active = "active",
  checking = "checking",
  recalculation = "recalculation",
  finished = "finished",
  canceled = "canceled",
  all = "all",
}

interface Stats {
  filter: string;
  active: number;
  checking: number;
  isFilter: boolean;
  inputReqValue: string;
  preInputNum: string;
  inputSummValue: string;
  inputIdValue: string;
}

export default class Filter extends Component<any, Stats> {
  reqRef: React.RefObject<HTMLInputElement>;
  summRef: React.RefObject<HTMLInputElement>;
  idRef: React.RefObject<HTMLInputElement>;

  static contextType = SocketContext;
  context!: React.ContextType<typeof SocketContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      filter: "",
      active: 0,
      preInputNum: "",
      checking: 0,
      isFilter: false,
      inputSummValue: "",
      inputIdValue: "",
      inputReqValue: "",
    };
    this.reqRef = React.createRef();
    this.summRef = React.createRef();
    this.idRef = React.createRef();
    this.update = this.update.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updateChecking = this.updateChecking.bind(this);
  }

  checkingNumber(el: React.ChangeEvent<HTMLInputElement>) {
    let value = el.currentTarget.value;

    if (
      /[0-9]/.test(value[value.length - 1]) &&
      value[0] === "0" &&
      value.length === 2
    ) {
      this.setState({ preInputNum: value[value.length - 1] });
      el.currentTarget.value = value[value.length - 1];
    } else if (!isNaN(Number(value))) {
      this.setState({ preInputNum: value });
      el.currentTarget.value = value;
    } else {
      el.currentTarget.value = this.state.preInputNum;
    }
  }
  setFilterAdd() {
    if (this.reqRef.current && this.summRef.current && this.idRef.current) {
      this.setState({
        inputReqValue: this.reqRef.current.value.trim(),
        inputSummValue: this.summRef.current.value.trim(),
        inputIdValue: this.idRef.current.value.trim(),
      });
      this.context.socket.emit("set filter add sale", {
        requisities: this.reqRef.current.value.trim(),
        order_id: this.idRef.current.value.trim(),
        summ: this.summRef.current.value.trim(),
      });
      this.setState({ isFilter: false });
    }
  }

  setClearFilter() {
    if (this.reqRef.current && this.summRef.current && this.idRef.current) {
      this.setState({
        inputReqValue: "",
        inputSummValue: "",
        inputIdValue: "",
      });
      this.context.socket.emit("set filter add sale", {
        requisities: "",
        order_id: "",
        summ: "",
      });
      this.setState({ isFilter: false });
    }
  }

  enterFilter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      this.setFilterAdd();
    }
  }

  update(filter: string) {
    this.setState({ filter });
  }

  updateActive(count: number) {
    this.setState({ active: count });
  }

  updateChecking(count: number) {
    this.setState({ checking: count });
  }

  componentDidMount() {
    this.context.socket.on("set filter sale", this.update);
    this.context.socket.emit("subscription sale checking actual number");
    this.context.socket.emit("subscription sale active actual number");
    this.context.socket.on("saleCheckingNumFilter", this.updateChecking);
    this.context.socket.on("saleActiveNumFilter", this.updateActive);
  }

  componentWillUnmount() {
    this.context.socket.off("set filter sale", this.update);
    this.context.socket.off("saleCheckingNumFilter", this.updateChecking);
    this.context.socket.off("saleActiveNumFilter", this.updateChecking);
    this.setState = (state, callback) => {
      return;
    };
  }

  setFilter(filter: string) {
    this.context.socket.emit("set filter sale", filter);
  }

  render() {
    return (
      <div className="filterSale">
        <div className="menuFilter">
          <div>
            <h2
              className={
                this.state.filter === StatusSell.active ? "active" : ""
              }
              onClick={() => this.setFilter(StatusSell.active)}
            >
              Активные
            </h2>
            {this.state.active && this.state.active > 0 ? (
              <SaleNotfFilter
                count={this.state.active}
                status={StatusSell.active}
              />
            ) : null}
          </div>
          <div>
            <h2
              className={
                this.state.filter === StatusSell.checking ? "active" : ""
              }
              onClick={() => this.setFilter(StatusSell.checking)}
            >
              На проверке
            </h2>
            {this.state.checking && this.state.checking > 0 ? (
              <SaleNotfFilter
                count={this.state.checking}
                status={StatusSell.checking}
              />
            ) : null}
          </div>
          <div>
            <h2
              className={
                this.state.filter === StatusSell.recalculation ? "active" : ""
              }
              onClick={() => this.setFilter(StatusSell.recalculation)}
            >
              Пересчитанные
            </h2>
          </div>
          <div>
            <h2
              className={
                this.state.filter === StatusSell.finished ? "active" : ""
              }
              onClick={() => this.setFilter(StatusSell.finished)}
            >
              Завершенные
            </h2>
          </div>
          <div>
            <h2
              className={
                this.state.filter === StatusSell.canceled ? "active" : ""
              }
              onClick={() => this.setFilter(StatusSell.canceled)}
            >
              Отмененные
            </h2>
          </div>
          <div>
            <h2
              className={this.state.filter === StatusSell.all ? "active" : ""}
              onClick={() => this.setFilter(StatusSell.all)}
            >
              Все
            </h2>
          </div>
        </div>
        <div className="menuSearch">
          <div>
            <h2
              style={{ paddingRight: "30px" }}
              onClick={() => {
                this.setState({ isFilter: !this.state.isFilter });
              }}
            >
              Фильтр
            </h2>
            {this.state.isFilter ? (
              <div className="filterSaleForm">
                <label htmlFor="id">ID заявки:</label>
                <input
                  onKeyDown={(e) => this.enterFilter(e)}
                  ref={this.idRef}
                  type="text"
                  name="id"
                  id="id"
                  defaultValue={this.state.inputIdValue}
                />
                <label htmlFor="req">Реквизиты:</label>
                <input
                  ref={this.reqRef}
                  type="text"
                  onKeyDown={(e) => this.enterFilter(e)}
                  name="req"
                  id="req"
                  defaultValue={this.state.inputReqValue}
                />
                <label htmlFor="summ">Сумма {`(RUB)`}:</label>
                <input
                  onChange={(el) => this.checkingNumber(el)}
                  ref={this.summRef}
                  type="text"
                  name="summ"
                  onKeyDown={(e) => this.enterFilter(e)}
                  id="summ"
                  defaultValue={this.state.inputSummValue}
                />
                <div>
                  <button onClick={() => this.setClearFilter()}>
                    Очистить
                  </button>
                  <button onClick={() => this.setFilterAdd()}>Применить</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
